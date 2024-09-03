import React from "react"
import * as ReactDOMClient from "react-dom/client"

const app = ReactDOMClient.createRoot(document.getElementById("app"))

const elements = (<div className="hehe">
  <h1>I am gay</h1>
  <input placeholder="hehe"></input>
</div>)

app.render(elements)