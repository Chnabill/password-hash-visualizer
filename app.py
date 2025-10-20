from flask import Flask, render_template, request, jsonify
import bcrypt


app = Flask(__name__)

# Debug: Print all routes
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
        password = request.form['password']
        password_encode = password.encode('utf-8')
        password_hashed = bcrypt.hashpw(password_encode, bcrypt.gensalt())
        print(f"Password : {password}")     
        print(f"Password encode utf-8 : {password_encode}")   
        print(f"Password hashed : {password_hashed}")
        return jsonify({"Password": password, "hashed_password": password_hashed.decode('utf-8')})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    print_routes()  
    app.run(debug=True)
