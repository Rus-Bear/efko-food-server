from scipy import optimize
import numpy as np
import json
import sys

with open('pythonScripts/input.json') as f:
    templates = json.load(f)

c = np.array(templates["ceil"])
A_ub = np.array(templates["left"])
B_ub = np.array(templates["right"])
res = optimize.linprog(-c, A_ub, B_ub, method='simplex')

for i in range(0, len(res.x)):
    if i != len(res.x) - 1:
        print(str(res.x[i]) + ',', end='')
    else:
        print(str(res.x[i]), end='')

sys.stdout.flush()