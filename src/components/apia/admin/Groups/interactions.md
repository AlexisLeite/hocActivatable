# Groups admin interactions

## onLoad, onPageChange

- **METHOD:** POST
- **URL:** http://localhost:8080/Apia/apia.administration.GroupsAction.run?

  - action = page
  - tabId = 1639683135759
  - tokenId = 1639683124101
  - timestamp
  - isAjax: true
  - pageNumber: number

- **Response:** A table function

## onRefresh

- **METHOD:** POST
- **URL:** http://localhost:8080/Apia/apia.administration.GroupsAction.run?

  - action=refresh
  - isAjax=true
  - tabId=1641926000137
  - tokenId=1641925984147
  - timestamp=1641926043890

- **RESPONSE:** A table function

## onUpdateClick

### First

- **METHOD:** GET
- **URL:** http://localhost:8080/Apia/apia.administration.GroupsAction.run?
  - action=update
  - id=2177
  - tabId=1641926000137
  - tokenId=1641925984147
- **RESPONSE:** An HTML With the updating view

### Then

- **MEHOTD:** POST
- **URL:**
- http://localhost:8080/Apia/apia.administration.GroupsAction.run?
  - action=getEnvironments
  - isAjax=true
  - tabId=1641926000137
  - tokenId=1641925984147
- **RESPONSE:**

```xml
<result>
  <environments>
    <environment text="MAURO" id="1770"/>
    <environment text="DEFAULT" id="1"/>
    <environment text="LATEST_DEFAULT_CLONED_2" id="1839"/>
    <environment text="DEFAULT_HOY" id="1810"/>
  </environments>
</result>
```

## onRowMoreInfo

- **METHOD:** POST
- **URL:** http://localhost:8080/Apia/apia.administration.GroupsAction.run?

  - action=adtInfo
  - isAjax=true
  - tabId=1641926000137
  - tokenId=1641925984147

- **RESPONSE:**

```xml
<data onClose="" >
  <load canClose="true"  type="function" >
    <function name="callAdditionalProcessXmlInfoResponse" >
      <messages>
        <row id="2319" >
          <cell name="Tipo" >Normal</cell>
        </row>
      </messages>
    </function>
  </load>
</data>
```

## onChangeFilter

- **METHOD:** POST
- **URL:** http://localhost:8080/Apia/apia.administration.GroupsAction.run?

  - action=filter
  - isAjax=true
  - tabId=1641989871677
  - tokenId=1641989310136
  - timestamp=1642000401369

- **PAYLOAD:** A FormData with the filters values

- **RESPONSE:** Table function

## onDownloadFile

### First

- **URL:** http://localhost:8080/Apia/apia.administration.GroupsAction.run?
  - action=createExcelFile
  - isAjax=true
  - tabId=1642015820687
  - tokenId=1642013496666
- **Method:** POST
- **Response:** XML

```xml
<data onClose="" >
  <load canClose="true"  type="function" >
    <function name="downloadFile" />
  </load>
</data>
```

### If function="downloadFile"

- **URL:** http://localhost:8080/Apia/apia.administration.GroupsAction.run?
  - action=download
  - tabId=1642015820687
  - tokenId=1642013496666
- **Method:** GET
- **Response:** Nothing, downloads the file

## onSortChange

- **URL:**

## onClickModify

- **Response:** A modal XML

```xml

```
