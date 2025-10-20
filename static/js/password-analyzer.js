

class PasswordAnalyzer {
    constructor() {
        this.commonWords = [
            'password', 'admin', 'user', 'login', 'welcome', 'hello', 'test', '123', 'abc',
            'qwerty', 'asdf', 'zxcv', 'password123', 'admin123', 'user123', 'login123',
            'welcome123', 'hello123', 'test123', 'password1', 'admin1', 'user1', 'login1',
            'welcome1', 'hello1', 'test1', 'password!', 'admin!', 'user!', 'login!',
            'welcome!', 'hello!', 'test!', 'password@', 'admin@', 'user@', 'login@',
            'welcome@', 'hello@', 'test@', 'password#', 'admin#', 'user#', 'login#',
            'welcome#', 'hello#', 'test#', 'password$', 'admin$', 'user$', 'login$',
            'welcome$', 'hello$', 'test$', 'password%', 'admin%', 'user%', 'login%',
            'welcome%', 'hello%', 'test%', 'password^', 'admin^', 'user^', 'login^',
            'welcome^', 'hello^', 'test^', 'password&', 'admin&', 'user&', 'login&',
            'welcome&', 'hello&', 'test&', 'password*', 'admin*', 'user*', 'login*',
            'welcome*', 'hello*', 'test*', 'password(', 'admin(', 'user(', 'login(',
            'welcome(', 'hello(', 'test(', 'password)', 'admin)', 'user)', 'login)',
            'welcome)', 'hello)', 'test)', 'password-', 'admin-', 'user-', 'login-',
            'welcome-', 'hello-', 'test-', 'password_', 'admin_', 'user_', 'login_',
            'welcome_', 'hello_', 'test_', 'password=', 'admin=', 'user=', 'login=',
            'welcome=', 'hello=', 'test=', 'password+', 'admin+', 'user+', 'login+',
            'welcome+', 'hello+', 'test+', 'password[', 'admin[', 'user[', 'login[',
            'welcome[', 'hello[', 'test[', 'password]', 'admin]', 'user]', 'login]',
            'welcome]', 'hello]', 'test]', 'password{', 'admin{', 'user{', 'login{',
            'welcome{', 'hello{', 'test{', 'password}', 'admin}', 'user}', 'login}',
            'welcome}', 'hello}', 'test}', 'password|', 'admin|', 'user|', 'login|',
            'welcome|', 'hello|', 'test|', 'password\\', 'admin\\', 'user\\', 'login\\',
            'welcome\\', 'hello\\', 'test\\', 'password:', 'admin:', 'user:', 'login:',
            'welcome:', 'hello:', 'test:', 'password;', 'admin;', 'user;', 'login;',
            'welcome;', 'hello;', 'test;', 'password"', 'admin"', 'user"', 'login"',
            'welcome"', 'hello"', 'test"', 'password\'', 'admin\'', 'user\'', 'login\'',
            'welcome\'', 'hello\'', 'test\'', 'password<', 'admin<', 'user<', 'login<',
            'welcome<', 'hello<', 'test<', 'password>', 'admin>', 'user>', 'login>',
            'welcome>', 'hello>', 'test>', 'password,', 'admin,', 'user,', 'login,',
            'welcome,', 'hello,', 'test,', 'password.', 'admin.', 'user.', 'login.',
            'welcome.', 'hello.', 'test.', 'password?', 'admin?', 'user?', 'login?',
            'welcome?', 'hello?', 'test?', 'password/', 'admin/', 'user/', 'login/',
            'welcome/', 'hello/', 'test/', 'password~', 'admin~', 'user~', 'login~',
            'welcome~', 'hello~', 'test~', 'password`', 'admin`', 'user`', 'login`',
            'welcome`', 'hello`', 'test`'
        ];
        
        this.attackerProfiles = [
            {
                name: "Online (Throttled)",
                description: "Rate-limited online attack",
                guessesPerSecond: 100 / 3600, 
                color: "#e74c3c"
            },
            {
                name: "Local Laptop (GPU)",
                description: "Single GPU on personal computer",
                guessesPerSecond: 1e9,
                color: "#f39c12"
            },
            {
                name: "Cloud Cluster (Multi-GPU)",
                description: "Professional cloud computing cluster",
                guessesPerSecond: 1e12,
                color: "#e67e22"
            },
            {
                name: "Nation-State (ASIC)",
                description: "Specialized hardware and resources",
                guessesPerSecond: 1e15,
                color: "#d35400"
            },
            {
                name: "Extreme (Theoretical)",
                description: "Maximum theoretical attack capability",
                guessesPerSecond: 1e18,
                color: "#c0392b"
            }
        ];
    }

  
    calculateEntropy(password) {
        const types = new Set();
        
        
        for (const char of password) {
            if (/[a-z]/.test(char)) types.add('lowercase');
            else if (/[A-Z]/.test(char)) types.add('uppercase');
            else if (/[0-9]/.test(char)) types.add('digits');
            else if (/[^a-zA-Z0-9]/.test(char)) types.add('symbols');
        }
        
        
        let totalChars = 0;
        if (types.has('lowercase')) totalChars += 26;
        if (types.has('uppercase')) totalChars += 26;
        if (types.has('digits')) totalChars += 10;
        if (types.has('symbols')) totalChars += 32; 
        
        
        if (totalChars === 0) totalChars = 1;
        
        const entropy = password.length * Math.log2(totalChars);
        
        return {
            passwordLength: password.length,
            typesUsed: Array.from(types),
            entropyBits: Math.max(0, Math.round(entropy * 100) / 100),
            missingTypes: ['lowercase', 'uppercase', 'digits', 'symbols'].filter(type => !types.has(type)),
            strengthRating: this.getStrengthRating(entropy)
        };
    }

   
    getStrengthRating(entropy) {
        if (entropy < 30) return "Weak";
        if (entropy < 50) return "Medium";
        if (entropy < 70) return "Strong";
        return "Very Strong";
    }

    
    detectPatterns(password) {
        const patterns = {
            dictionaryWords: false,
            commonPatterns: false,
            repetitive: false,
            sequential: false,
            personalInfo: false
        };
        
        const passwordLower = password.toLowerCase();
        
        
        for (const word of this.commonWords) {
            if (passwordLower.includes(word)) {
                patterns.dictionaryWords = true;
                break;
            }
        }
        
        
        if (/123|abc|qwe|asd|zxc/.test(password)) {
            patterns.commonPatterns = true;
        }
        
        
        const uniqueChars = new Set(password).size;
        if (uniqueChars < password.length * 0.5) {
            patterns.repetitive = true;
        }
        
       
        const sequential = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < password.length - 2; i++) {
            if (sequential.includes(password.substring(i, i + 3).toLowerCase())) {
                patterns.sequential = true;
                break;
            }
        }
        
     
        const personalPatterns = ["name", "birth", "date", "year", "2023", "2024", "2025"];
        if (personalPatterns.some(pattern => passwordLower.includes(pattern))) {
            patterns.personalInfo = true;
        }
        
     
        const detectedPatterns = Object.values(patterns).filter(Boolean).length;
        
        let confidenceLevel, reason;
        if (detectedPatterns === 0) {
            confidenceLevel = "High";
            reason = "No common patterns detected. Password appears to be randomly generated.";
        } else if (detectedPatterns <= 2) {
            confidenceLevel = "Medium";
            reason = `Some patterns detected (${detectedPatterns}). Password may be predictable.`;
        } else {
            confidenceLevel = "Low";
            reason = `Multiple patterns detected (${detectedPatterns}). Password is highly predictable.`;
        }
        
        return {
            confidenceLevel,
            reason,
            detectedPatterns: patterns
        };
    }

   
    calculateCrackTimes(entropyBits) {
        return this.attackerProfiles.map(profile => {
            
            const validEntropy = Math.max(1, entropyBits || 1);
            const timeSeconds = Math.pow(2, validEntropy) / profile.guessesPerSecond;
            
            return {
                name: profile.name,
                description: profile.description,
                crackTime: this.formatTime(timeSeconds),
                guessesPerSecond: profile.guessesPerSecond,
                color: profile.color
            };
        });
    }

   
    formatTime(seconds) {
        // Handle edge cases
        if (!seconds || seconds <= 0 || !isFinite(seconds)) {
            return "Instant";
        }
        
        if (seconds < 1) {
            return `${(seconds * 1000).toFixed(2)} milliseconds`;
        } else if (seconds < 60) {
            return `${seconds.toFixed(2)} seconds`;
        } else if (seconds < 3600) {
            return `${(seconds / 60).toFixed(2)} minutes`;
        } else if (seconds < 86400) {
            return `${(seconds / 3600).toFixed(2)} hours`;
        } else if (seconds < 31536000) {
            return `${(seconds / 86400).toFixed(2)} days`;
        } else {
            return `${(seconds / 31536000).toFixed(2)} years`;
        }
    }

    
    generateHash(password) {
        
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return `demo_hash_${Math.abs(hash).toString(16)}`;
    }


    analyzePassword(password) {
        const entropy = this.calculateEntropy(password);
        const patterns = this.detectPatterns(password);
        const crackTimes = this.calculateCrackTimes(entropy.entropyBits);
        const hash = this.generateHash(password);
        
        return {
            originalPassword: password,
            hashedPassword: hash,
            entropyAnalysis: entropy,
            patternAnalysis: patterns,
            crackTimeEstimates: crackTimes
        };
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = PasswordAnalyzer;
}
