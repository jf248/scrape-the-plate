# State shape

```
{
 loading: number
 resources: {
   [resourceName]: {
     data: {
       [id]: {}
       ...
     }
     list: {
       ids: [ ... ]
       total: number
       params: {}
     }
   }
 }
}
```
