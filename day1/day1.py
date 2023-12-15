# read the input file .txt
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

total = 0

with open(file_path, "r") as f:
    for line in f:
    # add to the running total
        total += get_first_last_digits(line)


print('total :', total)


# return total value

# print (get_first_last_digits("5ffour295"))

# input = "5ffour295" 
# result = get_first_last_digits(input)
# print("type: ", type(result))
# print(int(result) + 2)

