import sets
import scan_set

import os

path = 'ids/'
setlist = os.listdir(path)


def getall(set):
    id = scan_set.scan_set(set)
    scan_set.write_ids(set, id)

for set in sets.set_info:
    s = set + '.txt'
    if s not in setlist:
        print "Getting " + set
        getall(set)
    
print "\n\nCompletely Finished........"
