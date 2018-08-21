# Burn list
- Grocery Items
- Perfomance
- Add link to users, takes to recipes filter by that user
- Search and filter: debounced, search ingredients, tags, sites
- Image upload
- More scrape sites
- Tests
- Meal plan, Shopping list
- Like feature


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
