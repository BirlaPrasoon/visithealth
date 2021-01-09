from os import walk
import requests
import argparse

def hourly_job(url, mypath):
    _, _, filenames = next(walk(mypath))
    for filename in filenames:
        fullpath =mypath + '/' + filename
        with open(fullpath, 'rb') as f:
            files = {'file': (fullpath, f, 'text/csv')}
            res = requests.post(url, files=files)
            print(res)
 
# Initialize parser
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    
    # Adding optional argument
    parser.add_argument("-u", "--url", default="http://localhost:3005/users/save", help = "Show Output")
    parser.add_argument("-l", "--location", default="/home/prasoon/Downloads", help = "Show Output")
 
# Read arguments from command line
    args = parser.parse_args()
    print(f"URL :{args.url}, {args.location}" )
    hourly_job(args.url, args.location)