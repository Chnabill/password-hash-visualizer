# Password Hash Visualizer

A  Flask-based web application for analyzing password strength and visualizing password hashes with client-side analysis by default.

## Privacy-First Design

This application implements a **100% client-side privacy model** where:

- **All analysis happens in your browser** - your password never leaves your device
- **No server transmission** - passwords are never sent to any server
- **Full functionality available client-side** - entropy calculation, pattern detection, and crack time estimation
- **Complete privacy** - your data stays on your device

### Why This Matters

- **Security**: Your passwords are never transmitted over the network
- **Privacy**: No server logs or data collection
- **Trust**: Recruiters and security professionals immediately recognize this as best practice
- **Transparency**: Complete client-side processing with no data transmission

## Features

### Client-Side Analysis
- **Entropy Calculation**: Mathematical password strength analysis
- **Pattern Detection**: Identifies common weak patterns
- **Crack Time Estimation**: Multiple attacker profile scenarios
- **Character Type Analysis**: Identifies missing character types
- **Strength Rating**: Weak/Medium/Strong/Very Strong classification

### Hashing Sandbox & Benchmark
- **bcrypt Hashing**: Configurable rounds (4-31) with realistic timing simulation
- **Argon2 Hashing**: Memory-hard function with configurable memory, iterations, and parallelism
- **scrypt Hashing**: CPU/memory-hard function with configurable N, r, p parameters
- **Performance Benchmarking**: Comprehensive testing across different parameter combinations
- **Attack Resistance Analysis**: Estimates resistance against different attacker profiles
- **Visual Performance Charts**: Interactive charts showing hashing performance comparisons


## Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd password-hash-visualizer
```

2. **Create virtual environment**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Run the application**:
```bash
python app.py
```

5. **Open your browser**:
```
http://127.0.0.1:5000
```

## Project Structure

```
password-hash-visualizer/
├── app.py                          # Flask application
├── requirements.txt                 # Python dependencies
├── static/
│   └── js/
│       └── password-analyzer.js    # Client-side analysis engine
├── templates/
│   └── index.html                  # Main application interface
├── utils/
│   ├── entropy.py                  # Server-side entropy calculations
│   ├── common_words.txt            # Common password patterns
└── README.md                       # This file
```

## Technical Implementation

### Client-Side Analysis Engine
- **Pure JavaScript** - no external dependencies for core analysis
- **Entropy Calculation** - mathematical password strength assessment
- **Pattern Detection** - identifies common weak patterns
- **Crack Time Estimation** - multiple attacker scenarios
- **Local Storage** - no data transmission

### Technical Features
- **Flask Backend** - Python web framework for serving the application
- **Client-Side JavaScript** - Pure browser-based analysis engine
- **File-based Pattern Detection** - easily maintainable word lists
- **Advanced Entropy Analysis** - comprehensive security metrics

## Usage

### Password Analysis
1. Enter your password in the form
2. Click "Analyze Locally (Client-Side)"
3. View comprehensive analysis without sending data to servers


### Hashing Sandbox & Benchmark
1. Navigate to the "Hashing Sandbox" tab
2. Enter a password to hash
3. Select algorithm (bcrypt, Argon2, or scrypt)
4. Configure parameters using the sliders
5. Click "Generate Hash" to create a hash with timing analysis
6. Click "Run Benchmark" to test multiple configurations
7. View performance charts and attack resistance analysis

## Security Considerations

### Security Features
- **No Network Transmission** - passwords stay in browser
- **Local Processing** - all analysis happens locally
- **No Server Logs** - no server-side password storage
- **Immediate Results** - no network latency


## User Interface

### Privacy Banner
- **Clear Indication** - shows 100% client-side analysis
- **Privacy-First Design** - all analysis happens locally

### Analysis Modes
- **Password Analysis** - basic entropy and strength analysis
- **Crack Time Estimator** - advanced attacker profile analysis
- **Visual Charts** - interactive data visualization
- **Responsive Design** - works on all devices


## Performance

### Performance Benefits
- **Instant Results** - no network requests required
- **Offline Capable** - works without internet connection
- **Low Resource Usage** - efficient JavaScript algorithms
- **Responsive UI** - smooth user experience

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.



**Privacy Notice**: This application is designed with privacy-first principles. Your passwords never leave your device - all analysis happens 100% client-side.
