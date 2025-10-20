from flask import Flask, render_template, request, jsonify
import bcrypt
from utils.entropy import entropy_calculation, advanced_crack_estimator, detect_patterns

app = Flask(__name__)

def print_routes():
    print("Available routes:")
    for rule in app.url_map.iter_rules():
        print(f"  {rule.rule} -> {rule.endpoint} [{', '.join(rule.methods)}]")

@app.route('/', methods=['GET'])
def mainPage():
    return render_template('index.html')



@app.route('/analyse', methods=['POST'])
def analyze():
    try:
        if request.form:
            password = request.form['password']
            print(f"Received password from form: {password}")
        elif request.json:
            password = request.json['password']
            print(f"Received password from JSON: {password}")
        else:
            return jsonify({"error": "No password provided"}), 400
        
        password_encode = password.encode('utf-8')
        password_hashed = bcrypt.hashpw(password_encode, bcrypt.gensalt())
        print(f"Password hashed: {password_hashed.decode('utf-8')}")

        entropy_data = entropy_calculation(password)
        print(f"Entropy analysis: {entropy_data}")
        
        return jsonify({
            "original_password": password, 
            "hashed_password": password_hashed.decode('utf-8'), 
            "password_analysis": entropy_data
        })
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)})

@app.route('/crack_estimate', methods=['POST'])
def crackEstimate():
    try:
        if request.form:
            password = request.form['password']
        elif request.json:
            password = request.json['password']
        else:
            return jsonify({"error": "No password provided"}), 400
        
        print(f"Analyzing crack time for password: {password}")
        
        entropy_data = entropy_calculation(password)
        crack_estimates = advanced_crack_estimator(entropy_data['entropy_bits'])
        pattern_analysis = detect_patterns(password)
        
        response = {
            "password_length": entropy_data['password_length'],
            "entropy_bits": entropy_data['entropy_bits'],
            "strength_rating": entropy_data['strength_rating'],
            "attacker_profiles": crack_estimates,
            "confidence_level": pattern_analysis['confidence_level'],
            "confidence_reason": pattern_analysis['reason']
        }
        
        print(f"Analysis complete: {entropy_data['strength_rating']} strength")
        return jsonify(response)
        
    except Exception as e:
        print(f"Error in crack estimation: {e}")
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    print_routes()  
    app.run(debug=True)
