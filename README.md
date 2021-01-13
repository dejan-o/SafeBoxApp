# npm start to run a project 

# Safe box description:
Locking:
1. user must enter 6 digit code and upper char L after. example --> 555333L
2. time between keypresses must be shorter than 1.2 or code will process

Unlocking:
1. user must enter 6 digit code. example --> 555333
2. time between keypresses must be shorter than 1.2 or code will process

Service mode:
1. if user types 000000 and that is not safebox code, system enters service mode
2. if api response doesnt match serial number, safebox exits from service mode
3. user can try to unlock safebox again, or enter service mode by typing 000000 again


