### state(redux store) structure and default value

```
{
  "categories": [],
  "posts": {
    "posts": [],
    "sortKey": "timestamp",
    "sortOrder": "desc",
    "isShowPostDialog": false,      # dialog to add/edit(currentPost)
    "currentPost": {}
  },
  "comments": {
    "comments": [],
    "sortKey": "timestamp",
    "sortOrder": "asc",
    "isShowCommentDialog": false,
    "currentComment": {}
  },
  "username": "koala"
}
```