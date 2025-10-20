
class HashingSandbox {
    constructor() {
        this.currentAlgorithm = 'bcrypt';
        this.benchmarkResults = [];
        this.benchmarkChartInstance = null;
    }

    selectAlgorithm(algorithm) {
        this.currentAlgorithm = algorithm;
        
        
        document.querySelectorAll('.algo-tab').forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        
        
        document.getElementById('bcrypt-params').style.display = algorithm === 'bcrypt' ? 'block' : 'none';
        document.getElementById('argon2-params').style.display = algorithm === 'argon2' ? 'block' : 'none';
        document.getElementById('scrypt-params').style.display = algorithm === 'scrypt' ? 'block' : 'none';
    }

    updateBcryptDisplay() {
        const rounds = document.getElementById('bcrypt-rounds').value;
        document.getElementById('bcrypt-rounds-display').textContent = rounds;
    }

    updateArgon2Display() {
        const memory = document.getElementById('argon2-memory').value;
        const iterations = document.getElementById('argon2-iterations').value;
        const parallelism = document.getElementById('argon2-parallelism').value;
        
        document.getElementById('argon2-memory-display').textContent = memory;
        document.getElementById('argon2-iterations-display').textContent = iterations;
        document.getElementById('argon2-parallelism-display').textContent = parallelism;
    }

    updateScryptDisplay() {
        const n = document.getElementById('scrypt-n').value;
        const r = document.getElementById('scrypt-r').value;
        const p = document.getElementById('scrypt-p').value;
        
        document.getElementById('scrypt-n-display').textContent = n;
        document.getElementById('scrypt-r-display').textContent = r;
        document.getElementById('scrypt-p-display').textContent = p;
    }

    // Advanced bcrypt simulation 
    async generateBcryptHash(password, rounds, progressCallback = null) {
        const startTime = performance.now();
        
        // Simulate bcrypt work 
        const workFactor = Math.pow(2, rounds - 8) * 5; 
        await this.simulateWorkWithProgress(workFactor, progressCallback);
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Generate a realistic bcrypt hash format
        const salt = this.generateSalt(16);
        const mockHash = `$2b$${rounds.toString().padStart(2, '0')}$${salt}${this.generateHashString(31)}`;
        
        return {
            hash: mockHash,
            duration: duration,
            rounds: rounds,
            algorithm: 'bcrypt'
        };
    }

    // Advanced Argon2 simulation with memory-hard characteristics
    async generateArgon2Hash(password, memory, iterations, parallelism, progressCallback = null) {
        const startTime = performance.now();
        
        // Simulate Argon2 memory-hard work
        const memoryWork = (memory * 1024 * 1024) / 1000000; // Convert MB to work units
        const iterationWork = iterations * 10;
        const parallelismWork = parallelism * 2;
        
        const totalWork = (memoryWork + iterationWork + parallelismWork) / 10;
        await this.simulateWorkWithProgress(totalWork, progressCallback);
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Generate a realistic Argon2 hash format
        const salt = this.generateSalt(16);
        const hash = this.generateHashString(32);
        const mockHash = `$argon2id$v=19$m=${memory},t=${iterations},p=${parallelism}$${salt}$${hash}`;
        
        return {
            hash: mockHash,
            duration: duration,
            memory: memory,
            iterations: iterations,
            parallelism: parallelism,
            algorithm: 'argon2'
        };
    }

    // Advanced scrypt simulation with CPU/memory cost
    async generateScryptHash(password, n, r, p, progressCallback = null) {
        const startTime = performance.now();
        
        
        const cpuWork = Math.log2(n) * 10; 
        const memoryWork = (n * r) / 10000; 
        const parallelWork = p * 5; 
        
        const totalWork = (cpuWork + memoryWork + parallelWork) / 5;
        await this.simulateWorkWithProgress(totalWork, progressCallback);
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        
        const salt = this.generateSalt(16);
        const hash = this.generateHashString(32);
        const mockHash = `$scrypt$n=${n},r=${r},p=${p}$${salt}$${hash}`;
        
        return {
            hash: mockHash,
            duration: duration,
            n: n,
            r: r,
            p: p,
            algorithm: 'scrypt'
        };
    }

    
    async simulateWork(workUnits) {
        return new Promise(resolve => {
            const start = performance.now();
            const work = () => {
                if (performance.now() - start >= workUnits) {
                    resolve();
                } else {
                    requestAnimationFrame(work);
                }
            };
            requestAnimationFrame(work);
        });
    }

    
    async simulateWorkWithProgress(workUnits, progressCallback = null) {
        return new Promise(resolve => {
            const start = performance.now();
            const work = () => {
                const elapsed = performance.now() - start;
                const progress = Math.min((elapsed / workUnits) * 100, 100);
                
                if (progressCallback) {
                    progressCallback(progress);
                }
                
                if (elapsed >= workUnits) {
                    resolve();
                } else {
                    requestAnimationFrame(work);
                }
            };
            requestAnimationFrame(work);
        });
    }

    
    generateSalt(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    
    generateHashString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Calculate offline attack resistance
    calculateOfflineResistance(duration, algorithm) {
        // Different attacker capabilities 
        const attackerProfiles = {
            'laptop': 1e6,      // 1 million hashes/sec
            'gpu': 1e9,         // 1 billion hashes/sec
            'cluster': 1e12,    // 1 trillion hashes/sec
            'nation-state': 1e15 // 1 quadrillion hashes/sec
        };
        
        
        let estimatedEntropy;
        if (duration < 10) {
            estimatedEntropy = 40; // Weak
        } else if (duration < 100) {
            estimatedEntropy = 60; // Medium
        } else if (duration < 1000) {
            estimatedEntropy = 80; // Strong
        } else {
            estimatedEntropy = 100; // Very strong
        }
        
        const results = {};
        for (const [profile, attackerHashesPerSecond] of Object.entries(attackerProfiles)) {
            
            const totalPossibleHashes = Math.pow(2, estimatedEntropy);
            const timeToCrack = totalPossibleHashes / attackerHashesPerSecond;
            results[profile] = this.formatTime(timeToCrack);
        }
        
        return results;
    }

    formatTime(seconds) {
        if (seconds < 60) return `${seconds.toFixed(2)} seconds`;
        else if (seconds < 3600) return `${(seconds / 60).toFixed(2)} minutes`;
        else if (seconds < 86400) return `${(seconds / 3600).toFixed(2)} hours`;
        else if (seconds < 31536000) return `${(seconds / 86400).toFixed(2)} days`;
        else return `${(seconds / 31536000).toFixed(2)} years`;
    }

    // Display hash results
    displayHashResults(result, algorithm) {
        const content = document.getElementById('hash-content');
        
        let paramsHtml = '';
        if (algorithm === 'bcrypt') {
            paramsHtml = `<p><strong>Rounds:</strong> ${result.rounds}</p>`;
        } else if (algorithm === 'argon2') {
            paramsHtml = `
                <p><strong>Memory:</strong> ${result.memory} MB</p>
                <p><strong>Iterations:</strong> ${result.iterations}</p>
                <p><strong>Parallelism:</strong> ${result.parallelism}</p>
            `;
        } else if (algorithm === 'scrypt') {
            paramsHtml = `
                <p><strong>N (CPU/Memory cost):</strong> ${result.n}</p>
                <p><strong>r (Block size):</strong> ${result.r}</p>
                <p><strong>p (Parallelization):</strong> ${result.p}</p>
            `;
        }
        
        const resistance = this.calculateOfflineResistance(result.duration, algorithm);
        
        content.innerHTML = `
            <div class="analysis-section">
                <h3>Hash Generation Results</h3>
                <p><strong>Algorithm:</strong> ${algorithm.toUpperCase()}</p>
                <p><strong>Duration:</strong> ${result.duration.toFixed(2)} ms</p>
                ${paramsHtml}
            </div>
            
            <div class="analysis-section">
                <h3>Generated Hash</h3>
                <div class="json-response">${result.hash}</div>
            </div>
            
            <div class="analysis-section">
                <h3>Performance Analysis</h3>
                <p><strong>Hashes per second:</strong> ${(1000 / result.duration).toFixed(2)}</p>
                <div class="performance-metrics">
                    <div class="metric-card">
                        <div class="metric-value">${resistance.laptop}</div>
                        <div class="metric-label">Laptop Attack</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${resistance.gpu}</div>
                        <div class="metric-label">GPU Attack</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${resistance.cluster}</div>
                        <div class="metric-label">Cluster Attack</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${resistance['nation-state']}</div>
                        <div class="metric-label">Nation-State Attack</div>
                    </div>
                </div>
            </div>
        `;
    }

    
    async runBenchmark() {
        const password = document.getElementById('hash-password').value;
        if (!password) {
            alert('Please enter a password first.');
            return;
        }
        
        const benchmarkResults = document.getElementById('benchmark-results');
        const benchmarkContent = document.getElementById('benchmark-content');
        
        benchmarkResults.style.display = 'block';
        benchmarkContent.innerHTML = `
            <h3>Running comprehensive benchmark...</h3>
            <p>Testing multiple algorithms and parameter combinations...</p>
            <div class="benchmark-progress">
                <h4>Overall Progress</h4>
                <div class="progress-bar">
                    <div class="progress-fill" id="benchmark-progress"></div>
                </div>
                <div class="progress-text" id="benchmark-progress-text">0%</div>
            </div>
        `;
        
        const algorithms = ['bcrypt', 'argon2', 'scrypt'];
        const results = [];
        const totalTests = algorithms.length * 4; 
        let completedTests = 0;
        
        for (const algo of algorithms) {
            const testResults = await this.runAlgorithmBenchmark(password, algo, (progress) => {
                const overallProgress = ((completedTests + progress / 100) / totalTests) * 100;
                this.updateBenchmarkProgress(overallProgress);
            });
            results.push(testResults);
            completedTests += 4; 
        }
        
        this.displayBenchmarkResults(results);
    }

    async runAlgorithmBenchmark(password, algorithm, progressCallback = null) {
        const testCases = [];
        
        if (algorithm === 'bcrypt') {
            
            for (let rounds = 8; rounds <= 16; rounds += 2) {
                const result = await this.generateBcryptHash(password, rounds, progressCallback);
                testCases.push({
                    name: `${rounds} rounds`,
                    duration: result.duration,
                    params: { rounds },
                    resistance: this.calculateOfflineResistance(result.duration, algorithm)
                });
            }
        } else if (algorithm === 'argon2') {
            
            const testConfigs = [
                { memory: 16, iterations: 2, parallelism: 1 },
                { memory: 64, iterations: 3, parallelism: 4 },
                { memory: 256, iterations: 4, parallelism: 8 },
                { memory: 512, iterations: 5, parallelism: 8 }
            ];
            
            for (const config of testConfigs) {
                const result = await this.generateArgon2Hash(password, config.memory, config.iterations, config.parallelism, progressCallback);
                testCases.push({
                    name: `${config.memory}MB, ${config.iterations} iter`,
                    duration: result.duration,
                    params: config,
                    resistance: this.calculateOfflineResistance(result.duration, algorithm)
                });
            }
        } else if (algorithm === 'scrypt') {
            
            const testConfigs = [
                { n: 1024, r: 8, p: 1 },
                { n: 16384, r: 8, p: 1 },
                { n: 65536, r: 8, p: 1 },
                { n: 262144, r: 8, p: 1 }
            ];
            
            for (const config of testConfigs) {
                const result = await this.generateScryptHash(password, config.n, config.r, config.p, progressCallback);
                testCases.push({
                    name: `N=${config.n}`,
                    duration: result.duration,
                    params: config,
                    resistance: this.calculateOfflineResistance(result.duration, algorithm)
                });
            }
        }
        
        return {
            algorithm: algorithm,
            testCases: testCases
        };
    }

    displayBenchmarkResults(results) {
        const content = document.getElementById('benchmark-content');
        
        let html = '<div class="performance-metrics">';
        
        
        results.forEach(result => {
            html += `
                <div class="metric-card">
                    <div class="metric-value">${result.algorithm.toUpperCase()}</div>
                    <div class="metric-label">Algorithm</div>
                </div>
            `;
            
            result.testCases.forEach(testCase => {
                const hashesPerSecond = (1000 / testCase.duration).toFixed(2);
                html += `
                    <div class="metric-card">
                        <div class="metric-value">${hashesPerSecond}</div>
                        <div class="metric-label">${testCase.name} (hashes/sec)</div>
                    </div>
                `;
            });
        });
        
        html += '</div>';
        
        html += '<div class="benchmark-chart">';
        html += '<h3>Attack Resistance Analysis</h3>';
        html += '<div class="resistance-grid">';
        
        results.forEach(result => {
            html += `<div class="algorithm-section">`;
            html += `<h4>${result.algorithm.toUpperCase()}</h4>`;
            html += `<div class="resistance-table">`;
            html += `<table><thead><tr><th>Configuration</th><th>Laptop</th><th>GPU</th><th>Cluster</th><th>Nation-State</th></tr></thead><tbody>`;
            
            result.testCases.forEach(testCase => {
                html += `<tr>`;
                html += `<td>${testCase.name}</td>`;
                html += `<td>${testCase.resistance.laptop}</td>`;
                html += `<td>${testCase.resistance.gpu}</td>`;
                html += `<td>${testCase.resistance.cluster}</td>`;
                html += `<td>${testCase.resistance['nation-state']}</td>`;
                html += `</tr>`;
            });
            
            html += `</tbody></table></div></div>`;
        });
        
        html += '</div>';
        
       
        html += '<div class="benchmark-chart">';
        html += '<h3>Performance Comparison</h3>';
        html += '<canvas id="benchmarkChart" width="400" height="200"></canvas>';
        html += '</div>';
        
        content.innerHTML = html;
        
        // Create benchmark chart
        this.createBenchmarkChart(results);
    }

    createBenchmarkChart(results) {
        const ctx = document.getElementById('benchmarkChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.benchmarkChartInstance) {
            this.benchmarkChartInstance.destroy();
            this.benchmarkChartInstance = null;
        }
        
        const labels = [];
        const data = [];
        const colors = ['#e74c3c', '#f39c12', '#e67e22', '#d35400', '#c0392b', '#8e44ad', '#3498db'];
        
        results.forEach((result, resultIndex) => {
            result.testCases.forEach((testCase, testIndex) => {
                labels.push(`${result.algorithm} ${testCase.name}`);
                data.push(1000 / testCase.duration); 
            });
        });
        
        this.benchmarkChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Hashes per Second',
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderColor: colors.slice(0, labels.length),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Hashing Performance Benchmark',
                        color: '#fff'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Hashes per Second (Log Scale)',
                            color: '#fff'
                        },
                        ticks: {
                            color: '#fff'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#fff',
                            maxRotation: 45
                        }
                    }
                }
            }
        });
    }

    
    updateHashProgress(progress) {
        const progressFill = document.getElementById('hashing-progress');
        const progressText = document.getElementById('hashing-progress-text');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        }
    }

    // Update progress for benchmark
    updateBenchmarkProgress(progress) {
        const progressFill = document.getElementById('benchmark-progress');
        const progressText = document.getElementById('benchmark-progress-text');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        }
    }
}


const hashingSandbox = new HashingSandbox();
