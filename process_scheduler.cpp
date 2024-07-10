#include <iostream>
#include <iomanip>
#include <vector>
// #include <windows.h>
#include <algorithm>
#include <queue>
#include <chrono>
#include <thread>

using namespace std;

enum ALGORITHM {
    FIFO = 1,
    SJF = 2,
    ROUND_ROBIN = 3,
    EDF = 4
};

enum STATUS {
    NOT_READY = 0,
    READY = 1,
    RUNNING = 2,
    BLOCKED = 3,
    COMPLETE = 4
};

const int INSTANT = 1000;


class Process {
public:
    int code;

    int arrival_time;
    int execution_time;
    int remaining_time;

    int deadline;

    int system_quantum;
    int system_overhead;
    
    int status;

    Process(int cd, int arrival, int execution, int dline, int quantum, int overhead)
        : code(cd), arrival_time(arrival), execution_time(execution), remaining_time(execution),
             deadline(dline), system_quantum(quantum), system_overhead(overhead), status(NOT_READY) {}
};

bool compare_arrival_time(Process i, Process j) {
    return i.arrival_time < j.arrival_time;
}
bool compare_execution_time(Process i, Process j) {
    return i.execution_time < j.execution_time;
}
bool compare_deadline(Process i, Process j) {
    return i.deadline < j.deadline;
}
class ProcessScheduler {

    int current_time = 0;

    void idle() {
        cout << this->current_time << ": " << "Nada sendo executado..." << endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(INSTANT)); 
        this->current_time++;
    }

    void overhead_system(Process& p) {
        std::cout << this->current_time << ": " << "Realizando operações do sistema... (sobrecarga)" << endl; 
        std::this_thread::sleep_for(std::chrono::milliseconds(INSTANT)); 
        this->current_time++;
    }

    void block(Process& p) {
        std::cout << this->current_time << ": " << "Processo: " << p.code << " interrompido... Restam " << p.remaining_time << " segundos" << endl; 
        p.status = BLOCKED;
    }

    void make_ready(Process& p) {
        std::cout << this->current_time << ": " << "Processo: " << p.code << " pronto" << endl; 
        p.status = READY;
    }

    void finish(Process& p) {
        std::cout << "Processo: " << p.code << " terminado" << endl; 
        p.status = COMPLETE;
    }

    void run(Process& p) {
        std::cout << this->current_time << ": " << "Processo: " << p.code << " executando..." << endl; 
        p.remaining_time -= 1;
        std::this_thread::sleep_for(std::chrono::milliseconds(INSTANT));
        this->current_time++;
    }

    // A partir daqui, cada um dos métodos se refere à implementação de um dos algoritmos
    public:
        // retorna verdadeiro quando todos os processos forem processados
        bool run_fifo(vector<Process> processes, int n) {
            int complete = false;
            for (auto& process : processes) {
                while (process.arrival_time > this->current_time) {
                    this->idle();
                }

                process.status = RUNNING;
                while(process.remaining_time) {
                    this->run(process);
                }
                this->finish(process);
            }
            complete = true;
            return complete;
        }

        bool run_sjf(vector<Process> processes, int n) {
            sort(processes.begin(), processes.end(), compare_arrival_time);
            int total_processes = processes.size();
            int completed_processes = 0;
            bool completed_sjf = false;
            vector<std::reference_wrapper<Process>> ready_queue;
            while(completed_processes < total_processes) {
                // como estamos simulando segundo por segundo,
                //a cada segundo, verificamos se um novo processe está pronto
                for (auto& process : processes) {
                    if (process.arrival_time <= this->current_time && process.status != COMPLETE) {
                        ready_queue.push_back(process);
                        this->make_ready(process);
                    }
                }
                // se a fila estiver fazia, volta pro inicio
                if (ready_queue.empty()) {
                    this->idle();
                    continue;
                }

                sort(ready_queue.begin(), ready_queue.end(), compare_execution_time);
                Process& process = ready_queue[0];
                //remove o primeiro item da fila
                //Há estruturas mais eficientes aqui, como priority queue
                ready_queue.erase(ready_queue.begin());
                process.status = RUNNING;
                while(process.remaining_time) {
                    this->run(process);
                }
                this->finish(process);
                completed_processes++;
            }
            completed_sjf = true;
            return completed_sjf;
        }

        bool run_round_robin(vector<Process> processes, int n) {
            sort(processes.begin(), processes.end(), compare_arrival_time);
            int total_processes = processes.size();
            int completed_processes = 0;
            bool completed_rr = false;
            vector<std::reference_wrapper<Process>> ready_queue;
            while(completed_processes < total_processes) {
                // como estamos simulando segundo por segundo,
                //a cada segundo, verificamos se um novo processe está pronto
                for (auto& process : processes) {
                    if (process.arrival_time <= this->current_time && process.status == NOT_READY) {
                        ready_queue.push_back(process);
                        this->make_ready(process);
                    }
                }
                // se a fila estiver fazia, volta pro inicio
                if (ready_queue.empty()) {
                    this->idle();
                    continue;
                }

                Process& process = ready_queue[0];
                ready_queue.erase(ready_queue.begin());
                process.status = RUNNING;

                int exec_time = min(process.system_quantum, process.remaining_time);
                for (int i = 0; i < exec_time; i++) {
                    this->run(process);
                    // o escalonador continua procurando por novos processos prontos
                    // mesmo durante um quantum
                    for (auto& p : processes) {
                        if (p.arrival_time <= this->current_time && p.status == NOT_READY) {
                            ready_queue.push_back(p);
                            this->make_ready(p);
                        }
                    }
                }
                if(process.remaining_time == 0) {
                    this->finish(process);
                    completed_processes++;
                    continue;
                }

                int system_overhead = process.system_overhead;
                while(system_overhead--) {
                    this->overhead_system(process);
                }
                ready_queue.push_back(process);
            }
            completed_rr = true;
            return completed_rr;
        }

        bool run_edf(vector<Process> processes, int n) {
            sort(processes.begin(), processes.end(), compare_arrival_time);
            int total_processes = processes.size();
            int completed_processes = 0;
            bool completed_edf = false;
            vector<std::reference_wrapper<Process>> ready_queue;

            while(completed_processes < total_processes) {
                for (auto& process : processes) {
                    if (process.arrival_time <= this->current_time && process.status == NOT_READY) {
                        ready_queue.push_back(process);
                        this->make_ready(process);
                    }
                }
                
                if (ready_queue.empty()) {
                    this->idle();
                    continue;
                }

                sort(ready_queue.begin(), ready_queue.end(), compare_deadline);

                Process& process = ready_queue[0];
                ready_queue.erase(ready_queue.begin());
                process.status = RUNNING;

                while (process.remaining_time) {
                    this->run(process);

                    for (auto& p : processes) {
                        if (p.arrival_time <= this->current_time && p.status == NOT_READY) {
                            ready_queue.push_back(p);
                            this->make_ready(p);
                        }
                    }

                    if (!ready_queue.empty()) {
                        sort(ready_queue.begin(), ready_queue.end(), compare_deadline);

                        if (ready_queue[0].get().deadline < process.deadline) {
                        process.status = READY;
                        ready_queue.push_back(process);
                        // sort(ready_queue.begin(), ready_queue.end(), compare_deadline);
                        break;
                        }
                    }
                }

                if (process.remaining_time == 0) {
                    this->finish(process);
                    completed_processes++;
                }
            }

            completed_edf = true;
            return completed_edf;
        }
};

class OperatingSystem {

    int algorithm;

    public:

        int get_processes_number() {
            int n;
            std::cout << "Número de processos: ";
            cin >> n;
            return n;
        }

        vector<Process> get_processes(int n) {
            vector<Process> processes;

            for (int i = 0; i < n; ++i) {
                std::cout << "Processo " << i + 1 << ":\n";
                int arrival, execution, deadline, quantum, overhead;
                std::cout << "Tempo de chegada: ";
                cin >> arrival;
                std::cout << "Tempo de execução: ";
                cin >> execution;
                std::cout << "Deadline: ";
                cin >> deadline;
                std::cout << "Quantum: ";
                cin >> quantum;
                std::cout << "Sobrecarga do sistema: ";
                cin >> overhead;

                processes.emplace_back(i + 1, arrival, execution, deadline, quantum, overhead);
            }
            return processes;
        }

        int get_algorithm() {
            int algorithm;
            cout << "Selecione um algoritmo de escalonamento\n";
            cout << "1. FIFO\n";
            cout << "2. SJF\n";
            cout << "3. Round Robin\n";
            cout << "4. EDF\n";
            cout << "Digite um número (1-4)\n";
            cin >> algorithm;
            return algorithm;
        }

        void run() {
            int n = get_processes_number();
            vector<Process> processes = get_processes(n);
            this->algorithm = get_algorithm();

            sort(processes.begin(), processes.end(), compare_arrival_time);
            ProcessScheduler scheduler;
            bool complete;

            switch(this->algorithm) {
                case FIFO:
                    cout << "Rodando FIFO..." << endl;
                    complete = scheduler.run_fifo(processes, n);
                    break;
                case SJF:
                    cout << "Rodando SJF..." << endl;
                    complete = scheduler.run_sjf(processes, n);
                    break;
                case ROUND_ROBIN:
                    cout << "Rodando Round Robin..." << endl;
                    complete = scheduler.run_round_robin(processes, n);
                    break;
                case EDF:
                    cout << "Rodando EDF..." << endl;
                    complete = scheduler.run_edf(processes, n);
                    break;
            }
        }
};

int main() {

    OperatingSystem os;
    os.run();

    return 0;
}