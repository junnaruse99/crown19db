import os
from sys import platform

if __name__ == "__main__":
    # Use chromedriver based on OS
    if platform == "win32":
        PATH = "./gui_tests/chromedriver.exe"
    elif platform == "linux":
        PATH = "./gui_tests/chromedriver_linux"
    else:
        print("Unsupported OS")
        exit(-1)

    # Run all GUI tests:
    os.system("python ./gui_tests/navbar_tests.py " + PATH)
    os.system("python ./gui_tests/splash_tests.py " + PATH)
