# import input file.txt
file_path = "/Users/richarddao/Lychee-Repos/advent_of_code/day1/input.txt"

# for each line: concatenate the first and last number of string
def get_first_last_digits(string):
    # add only numbers to array from given string
    nums = []
    for letter in string:
        if (letter.isnumeric()):
            nums.append(letter)
    # concatenate first 
    result_num = nums[0] + nums[-1]
    return int(result_num)

with open(file_path, "r") as f:
    total = 0
    file_content = f.read().strip()
    for line in file_content.split('\n'):
        # init digits array to keep track of nums
        digits = [] 
        # iterating each character in line
        for i, c in enumerate(line):
            if c.isdigit():
                digits.append(c)
            # checking string, enumerate over words from one to nine
            for d, val in enumerate(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']):
                # check if substring starting from current index 
                # ex. 5ffour295, check if it started with word values from one to nine
                if line[i:].startswith(val):
                    print(line[i:])
                    # if it matches, we append to the digits array, the index + 1 because it starts are 0 when using enumerate
                    digits.append(str(d + 1))
        score = int(digits[0] + digits[-1])
        total += score
    print('total:', total)

