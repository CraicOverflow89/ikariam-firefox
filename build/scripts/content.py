# Read Data
def get_data(path):
	fs = open("src/scripts/" + path, "r")
	result = fs.read()
	fs.close()
	return result

# Write Data
fs = open("src/scripts/content.ts", "w")
fs.write(get_data("lib.ts"))
fs.write("\n\n")
fs.write(get_data("app.ts"))
fs.close()