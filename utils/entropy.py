import math






lowercase = list("abcdefghijklmnopqrstuvwxyz")
uppercase = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
digits = list("0123456789")
symbols = list("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~")




#This function takes 1 argument which is the password and it returns `password length` - `types used(lc, uc, symbols,numbers)`
#`entropy_bits` - `missing types` - `strength rating` - `crack time estimates` -> it uses the estimated_time_to_crack function
def entropy_calculation(password : str):
    types = set()
    
    for char in password:
        if char in lowercase:
            types.add('lowercase')
        elif char in uppercase:
            types.add('uppercase')
        elif char in digits:
            types.add('digits')
        elif char in symbols:
            types.add('symbols')
    

    total = sum(len(globals()[t]) for t in types)

    entropy = len(password)*math.log2(total)

    
    all_types = {'lowercase', 'uppercase', 'digits', 'symbols'}
    missing_types = list(all_types - types)




    # Calculate time to crack estimates
    crack_times = estimated_time_to_crack(entropy)
    
    response = {
        "password_length": len(password),
        "types_used": list(types),
        "entropy_bits": round(entropy, 2),
        "missing_types": missing_types,
        "strength_rating": get_strength_rating(entropy),
        "crack_time_estimates": crack_times
    }

    return response

def get_strength_rating(entropy):
    if entropy < 30:
        return "Weak"
    elif entropy < 50:
        return "Medium"
    elif entropy < 70:
        return "Strong"
    else:
        return "Very Strong"






#Estimated time to crack the password
#This function return the estimated time to crack the password based on the entropy and different scenarios(Slow online, botnet...)
#It takes 1 argument entropy bits using the formula entropy = L*log2(N)     L = password length, N = 26 (if we want the the password to have just lower case ) in case we use lowercases and uppercases N = 52
#it return this response json : {'slow_online': '132955343131758272.00 years', 'botnet': '132955343131758.27 years', 'gpu_rig': '132955343131.76 years', 'asic_cluster': '132955343.13 years', 'extreme': '132955.34 years'}
def estimated_time_to_crack(entropy_bits, guesses_per_second=1e6):
    """
    Calculate estimated time to crack password based on entropy.
    
    Args:
        entropy_bits: The entropy bits from password analysis
        guesses_per_second: Attacker's guessing rate (default: 1e6 for GPU)
    
    Returns:
        Dictionary with time estimates for different attack scenarios
    """
    scenarios = {
        "slow_online": 1e3,      # Rate-limited interface
        "botnet": 1e6,           # Large botnet
        "gpu_rig": 1e9,          # Modern GPU cracking
        "asic_cluster": 1e12,    # Specialized ASICs
        "extreme": 1e15          # Theoretical large cluster
    }
    
    results = {}
    for scenario, rate in scenarios.items():
        time_seconds = (2 ** entropy_bits) / rate
        results[scenario] = format_time(time_seconds)
    
    return results



def format_time(seconds):
    """Convert seconds to human-readable format"""
    if seconds < 60:
        return f"{seconds:.2f} seconds"
    elif seconds < 3600:
        return f"{seconds/60:.2f} minutes"
    elif seconds < 86400:
        return f"{seconds/3600:.2f} hours"
    elif seconds < 31536000:
        return f"{seconds/86400:.2f} days"
    else:
        return f"{seconds/31536000:.2f} years"






password = "MyPassword123!"
entropy_data = entropy_calculation(password)
crack_times = estimated_time_to_crack(entropy_data["entropy_bits"])

print(f"Password: {password}")
print(f"Entropy: {entropy_data['entropy_bits']} bits")
print("Crack times from entropy_data:")
print(entropy_data["crack_time_estimates"])
print("Crack times from separate function call:")
print(crack_times)

def advanced_crack_estimator(entropy_bits):
    """
    Advanced crack time estimator with multiple attacker profiles
    """
    attacker_profiles = [
        {
            "name": "Online (Throttled)",
            "description": "Rate-limited online attack",
            "guesses_per_second": 100 / 3600,  # 100 guesses/hour
            "color": "#e74c3c"
        },
        {
            "name": "Local Laptop (GPU)",
            "description": "Single GPU on personal computer",
            "guesses_per_second": 1e9,
            "color": "#f39c12"
        },
        {
            "name": "Cloud Cluster (Multi-GPU)",
            "description": "Professional cloud computing cluster",
            "guesses_per_second": 1e12,
            "color": "#e67e22"
        },
        {
            "name": "Nation-State (ASIC)",
            "description": "Specialized hardware and resources",
            "guesses_per_second": 1e15,
            "color": "#d35400"
        },
        {
            "name": "Extreme (Theoretical)",
            "description": "Maximum theoretical attack capability",
            "guesses_per_second": 1e18,
            "color": "#c0392b"
        }
    ]
    
    results = []
    for profile in attacker_profiles:
        time_seconds = (2 ** entropy_bits) / profile["guesses_per_second"]
        crack_time = format_time(time_seconds)
        
        results.append({
            "name": profile["name"],
            "description": profile["description"],
            "crack_time": crack_time,
            "guesses_per_second": profile["guesses_per_second"],
            "color": profile["color"]
        })
    
    return results

def detect_patterns(password):
    """
    Detect common password patterns and assess confidence
    """
    patterns = {
        "dictionary_words": False,
        "common_patterns": False,
        "repetitive": False,
        "sequential": False,
        "personal_info": False
    }
    
    # Load common words from files
    common_words = []
    try:
        # Load from common_words.txt
        with open('utils/common_words.txt', 'r', encoding='utf-8') as f:
            common_words.extend([line.strip().lower() for line in f if line.strip() and not line.startswith('#')])
        
        # Load from weak_patterns.txt
        with open('utils/weak_patterns.txt', 'r', encoding='utf-8') as f:
            common_words.extend([line.strip().lower() for line in f if line.strip() and not line.startswith('#')])
            
        print(f"Loaded {len(common_words)} common words/patterns")
    except FileNotFoundError as e:
        # Fallback to hardcoded list if files not found
        common_words = ["password", "admin", "user", "login", "welcome", "hello", "test", "123", "abc"]
        print(f"Common words files not found ({e}), using fallback list")
    
    # Check for dictionary words
    password_lower = password.lower()
    for word in common_words:
        if word in password_lower:
            patterns["dictionary_words"] = True
            print(f"Found common word: '{word}' in password")
            break
    
    # Check for common patterns
    if "123" in password or "abc" in password or "qwe" in password:
        patterns["common_patterns"] = True
    
    # Check for repetitive characters
    if len(set(password)) < len(password) * 0.5:
        patterns["repetitive"] = True
    
    # Check for sequential patterns
    sequential_chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    for i in range(len(password) - 2):
        if password[i:i+3].lower() in sequential_chars:
            patterns["sequential"] = True
            break
    
    # Check for personal info patterns (simplified)
    personal_patterns = ["name", "birth", "date", "year", "2023", "2024"]
    if any(pattern in password.lower() for pattern in personal_patterns):
        patterns["personal_info"] = True
    
    # Determine confidence level
    detected_patterns = sum(patterns.values())
    
    if detected_patterns == 0:
        confidence_level = "High"
        reason = "No common patterns detected. Password appears to be randomly generated."
    elif detected_patterns <= 2:
        confidence_level = "Medium"
        reason = f"Some patterns detected ({detected_patterns}). Password may be predictable."
    else:
        confidence_level = "Low"
        reason = f"Multiple patterns detected ({detected_patterns}). Password is highly predictable."
    
    return {
        "confidence_level": confidence_level,
        "reason": reason,
        "detected_patterns": patterns
    }

def add_custom_words(words_list, filename='utils/custom_words.txt'):
    """
    Add custom words to a file for pattern detection
    """
    try:
        with open(filename, 'a', encoding='utf-8') as f:
            for word in words_list:
                f.write(f"{word.lower()}\n")
        print(f"Added {len(words_list)} custom words to {filename}")
    except Exception as e:
        print(f"Error adding custom words: {e}")

def create_word_list_from_file(input_file, output_file='utils/generated_words.txt'):
    """
    Generate word variations from a base word list
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            base_words = [line.strip() for line in f if line.strip()]
        
        variations = []
        for word in base_words:
            # Add number suffixes
            for i in range(10):
                variations.append(f"{word}{i}")
                variations.append(f"{word}{i}!")
                variations.append(f"{word}{i}@")
                variations.append(f"{word}{i}#")
                variations.append(f"{word}{i}$")
        
        with open(output_file, 'w', encoding='utf-8') as f:
            for variation in variations:
                f.write(f"{variation}\n")
        
        print(f"Generated {len(variations)} word variations in {output_file}")
    except Exception as e:
        print(f"Error generating word list: {e}")

