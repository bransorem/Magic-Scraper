import sets
import scan_set


def getall(set):
    id = scan_set.scan_set(set)
    scan_set.write_ids(set, id)

for set in sets.set_info:
    getall(set)
    
print "\n\nCompletely Finished........"
