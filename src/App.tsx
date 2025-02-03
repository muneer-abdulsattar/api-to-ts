import MonacoEditor from '@monaco-editor/react'

import axios from "axios"
import JsonToTS from "json-to-ts"
import { Copy, Heart } from 'lucide-react'
import { useLocalStorage } from "react-use"
import { toast, Toaster } from 'sonner'
import { Button } from './components/ui/button'
import { Card } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'


interface State {
  url: string
  authorization: string
  body: string
  header: string
  method: "get" | "post" | "put" | "patch" | "delete"
  response: any
}

function App() {
  const [state, setState] = useLocalStorage<State>("state", {
    url: "",
    authorization: "",
    body: "",
    header: "",
    method: "get",
    response: ""
  })

  const [last10Responses, setLast10Responses] = useLocalStorage<State[]>("last10response", [])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value || "",
    } as State)
  }

  const onEditorChange = (value: string | undefined, felid: keyof State) => {
    setState({
      ...state,
      [felid]: value,
    } as State)
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    try {

      setState(() => (
        {
          ...state,
          response: ""
        }
      ) as State)
      const response = await axios?.[state!.method]?.(state!.url, {
        headers: {
          Authorization: state?.authorization || "",
          ...(state!.header ? JSON.parse(state!.header) : {})
        },
        data: state!.body ? JSON.parse(state!.body) : {}
      })


      const generatedTypes = JsonToTS(response.data).join("\n");
      const updatedResponse = state!.response + "\n" + generatedTypes;
      setState(() => (
        {
          ...state,
          response: updatedResponse
        }
      ) as State);

      setLast10Responses(prev => [
        ...prev,
        {
          method: state!.method,
          url: state!.url,
          response: updatedResponse
        }
      ])

    } catch (e) {
      toast.error("some error happened")

      setState(() => (
        {
          ...state,
          response: JSON.stringify(e.response.data)
        }
      ) as State)
    }




  }





  return (
    <>
      <div className="p-4">
        <p className='flex justify-center items-center gap-1 text-center'>Made With <Heart className='text-red-500' /> by <a target='_blank' href="https://www.linkedin.com/in/muneerabdulsattar">Muneer</a></p>
        <Card className='p-5'>
          <form onSubmit={onSubmit} >
            <div className="gap-5 grid grid-cols-2">

              <div >
                <Label>Api Endpoint</Label>
                <div className='flex gap-2'>
                  <Select value={state!.method} onValueChange={value => onEditorChange(value, "method")} >
                    <SelectTrigger className="w-[100px]" >
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
                  <Input required placeholder='endpoint' value={state!.url} name="url" onChange={onInputChange} className="border-2 bg-muted" />
                </div>
                <Label>Body</Label>
                <MonacoEditor
                  height="100px"
                  defaultLanguage="json"


                  theme='vs-dark'
                  value={state!.body}
                  onChange={e => onEditorChange(e, "body")}
                  options={{
                    minimap: { enabled: false },
                    readOnly: state!.method === "get"
                  }}
                />
              </div>
              <div>
                <Label>Authorization</Label>
                <Input value={state!.authorization} name="authorization" onChange={onInputChange} className="border-2 bg-muted" />
                <Label>Header</Label>

                <MonacoEditor
                  height="100px"
                  defaultLanguage="json"
                  theme='vs-dark'
                  value={state!.header}
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
          <div className='gap-5 grid grid-cols-2'>
            <div className='relative'>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(state!.response || "")
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
            </div>

            <div className='gap-5 grid'>
              <Label>Last 10 Responses</Label>
              {last10Responses!.map((response, index) => (
                <div key={index} className='relative'>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(response.response || "")
                      toast.success("Copied")

                    }}

                    size="icon" variant="outline" className='top-2 right-2 z-50 absolute'>
                    <Copy />
                  </Button>
                  <p>
                    <HttpMethodBadge method={
                      response.method.toUpperCase() as keyof typeof methodColors
                    } />
                    {response.url}
                  </p>
                  <MonacoEditor
                    height="200px"
                    defaultLanguage="typescript"
                    theme='vs-dark'
                    value={response.response}
                    options={{
                      minimap: { enabled: false },
                      readOnly: true
                    }}
                  />
                </div>

              ))}
            </div>
          </div>
        </Card>
      </div>

      <Toaster richColors />
    </>
  )
}

const methodColors = {
  GET: "bg-green-500 text-white",
  POST: "bg-blue-500 text-white",
  PUT: "bg-yellow-500 text-black",
  PATCH: "bg-orange-500 text-white",
  DELETE: "bg-red-500 text-white",
  OPTIONS: "bg-gray-500 text-white",
  HEAD: "bg-purple-500 text-white",
};

const HttpMethodBadge = ({ method }: {
  method: keyof typeof methodColors
}) => {
  return (
    <span className={`px-3 mx-1 rounded-lg text-sm font-semibold ${methodColors[method] || 'bg-gray-300 text-black'}`}>
      {method}
    </span>
  );
};

export default App
