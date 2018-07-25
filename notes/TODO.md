# Burn list
* Menu Controller, switch menu components to use the controller
* Delete Dialog on View should use ConfirmationModal
* Change all Modals to Dialogs
* Tags
* Move dataProvider logic to enhancedFetch?
* When to reverse compose function?

* Search and filter: debounced, search ingredients, tags, sites
* Image upload
* More scrape sites
* Tests
* Grocery Items
* Meal plan, Shopping list
* Like feature


# DRF

## Error Responses
```
{
    "detail": ""
}
```

## Response
GET_ONE
```
{
    ...record,
}
```

GET_LIST
```
{
    "count": number,
    "next": ?,
    "previous": ?,
    "results": [
        record, ...
    ],
}
```

UPDATE or CREATE
```
{
    ...record,
}
```

DELETE
No content
