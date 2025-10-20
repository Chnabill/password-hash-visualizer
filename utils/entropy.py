import math






lowercase = list("abcdefghijklmnopqrstuvwxyz")
uppercase = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
digits = list("0123456789")
symbols = list("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~")


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

    return {
        "password_length": len(password),
        "types_used": types,
        "entropy_bits": entropy
}



print(entropy_calculation("passwor#A1d"))