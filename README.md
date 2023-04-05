Just a little demo that shows a homebrew JQuery dragging select for datatables vs the select extension for datatables.

Both prevent the user from selecting certain rows. The homebrew solution is reading the css class, while datatables is reading 'employee' false.  

Datatables disable select will fail on shift select if a 'non-selectable' row is between two selectable rows.
