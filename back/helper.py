"""
model: model of sql
query: query of sql
field: field to be filtered
range: list of 1 string, contains the range separated by '-'
""" 
def filter_by_range(model, query, field, range):
    assert type(range) is list
    assert len(range) == 1
    assert type(range[0]) is str
    assert '-' in range[0]

    [range1, range2] = [int(val) for val in range.split('-')]
    query.filter(getattr(model, field).in_([range1, range2]))

    return
    
def filter_by_name():
    return

def sort():
    return