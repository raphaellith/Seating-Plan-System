from random import choice
import subprocess

with open('TestData.txt') as f:
    code = ['alumni =  [']
    for line in f.readlines():
        data = [i.strip() for i in line[:-1].split('  ') if i != '']
        data[0] = data[0].title()
        data[1] = int(data[1])
        data[2] = int(data[2])
        data[4] = int(data[4])
        code.append(f"new Alumnus({repr(data)[1:-1]}, '{''.join([choice('1234567890ABCDEF') for _ in range(7)])}'),")
    code.append(']')
    code = '\n'.join(code)
    print(code)
    subprocess.run("pbcopy", text=True, input=code)
