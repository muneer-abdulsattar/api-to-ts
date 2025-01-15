import MonacoEditor from '@monaco-editor/react'

import axios from "axios"
import JsonToTS from "json-to-ts"
import { Copy } from 'lucide-react'
import { useState } from "react"
import { toast, Toaster } from 'sonner'
import { Button } from './components/ui/button'
import { Card } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'


function App() {
  const [state, setState] = useState<{
    url: string
    authorization: string
    body: string
    header: string
    method: "get" | "post" | "put" | "patch" | "delete"
    response: any
  }>({
    url: "",
    authorization: "",
    body: "",
    header: "",
    method: "get",
    response: ""
  })

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const onEditorChange = (value: string | undefined, felid: keyof typeof state) => {
    setState({
      ...state,
      [felid]: value,
    })
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    try {

      setState(() => (
        {
          ...state,
          response: ""
        }
      ))
      const response = await axios?.[state.method]?.(state.url, {
        headers: {
          Authorization: state?.authorization || "",
          ...(state.header ? JSON.parse(state.header) : {})
        },
        data: state.body ? JSON.parse(state.body) : {}
      })


      JsonToTS(response.data).forEach(typeInterface => {
        setState(prev => (
          {
            ...state,
            response: prev?.response + "\n" + typeInterface
          }
        ))
      })
    } catch (e) {
      toast.error("some error happened")

      setState(() => (
        {
          ...state,
          response: JSON.stringify(e.response.data)
        }
      ))
    }




  }


  return (
    <>
      <div className="p-4">
        <Card className='p-5'>
          <form onSubmit={onSubmit} >
            <div className="gap-5 grid grid-cols-2">

              <div >
                <Label>Api Endpoint</Label>
                <div className='flex gap-2'>
                  <Select value={state.method} onValueChange={value => onEditorChange(value, "method")} >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="get">GET</SelectItem>
                      <SelectItem value="post">POST</SelectItem>
                      <SelectItem value="put">PUT</SelectItem>
                      <SelectItem value="patch">PATCH</SelectItem>
                      <SelectItem value="delete">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input required placeholder='endpoint' name="url" onChange={onInputChange} className="border-2 bg-muted" />
                </div>
                <Label>Body</Label>
                <MonacoEditor
                  height="100px"
                  defaultLanguage="json"


                  theme='vs-dark'
                  value={state.body}
                  onChange={e => onEditorChange(e, "body")}
                  options={{
                    minimap: { enabled: false },
                    readOnly: state.method === "get"
                  }}
                />
              </div>
              <div>
                <Label>Authorization</Label>
                <Input name="authorization" onChange={onInputChange} className="border-2 bg-muted" />
                <Label>Header</Label>

                <MonacoEditor
                  height="100px"
                  defaultLanguage="json"
                  theme='vs-dark'
                  value={state.header}
                  onChange={e => onEditorChange(e, "header")}
                  options={{
                    minimap: { enabled: false },
                  }}
                />
              </div>
            </div>
            <Button type='submit' className='block my-3 ml-auto'>Submit</Button>
          </form>
        </Card>
        <Card className='relative mt-1 p-5 h-[900px]'>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(state.response || "")
              toast.success("Copied")

            }}

            size="icon" variant="outline" className='top-2 right-2 z-50 absolute'>
            <Copy />
          </Button>
          <MonacoEditor

            height="900px"
            defaultLanguage="typescript"
            theme='vs-dark'
            value={state?.response}
            options={{
              minimap: { enabled: false },
              readOnly: true

            }}
          />
        </Card>
      </div>
      <Toaster richColors />
    </>
  )
}

export default App
