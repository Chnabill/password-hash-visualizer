#!/usr/bin/env python3
"""
Test script for pattern detection with file-based common words
"""

from utils.entropy import detect_patterns, add_custom_words

def test_pattern_detection():
    """Test the pattern detection with various passwords"""
    
    test_passwords = [
        "password123",      # Should detect dictionary word
        "admin!",           # Should detect dictionary word
        "MySecurePass2024", # Should be clean
        "qwerty123",        # Should detect common pattern
        "123456789",        # Should detect common pattern
        "asdfghjkl",        # Should detect common pattern
        "RandomPass!@#",    # Should be clean
        "password",         # Should detect dictionary word
        "user123",          # Should detect dictionary word
        "login!",           # Should detect dictionary word
    ]
    
    print("🔍 Testing Pattern Detection with File-Based Common Words")
    print("=" * 60)
    
    for password in test_passwords:
        print(f"\nPassword: '{password}'")
        result = detect_patterns(password)
        print(f"Confidence: {result['confidence_level']}")
        print(f"Reason: {result['reason']}")
        print(f"Patterns detected: {[k for k, v in result['detected_patterns'].items() if v]}")

def test_custom_words():
    """Test adding custom words"""
    print("\n" + "=" * 60)
    print("📝 Testing Custom Word Addition")
    
    # Add some custom words
    custom_words = ["company", "organization", "department", "team"]
    add_custom_words(custom_words)
    
    # Test with custom words
    test_password = "company123"
    print(f"\nTesting with custom word: '{test_password}'")
    result = detect_patterns(test_password)
    print(f"Confidence: {result['confidence_level']}")
    print(f"Reason: {result['reason']}")

if __name__ == "__main__":
    test_pattern_detection()
    test_custom_words()
