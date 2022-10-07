import { FormEvent, useState } from "react"

import Header from "../components/Header"

import { addDoc, collection } from "firebase/firestore"
import { CgSpinner } from "react-icons/cg"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"

const NewPostPage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [isLoading, setLoading] = useState(false)

  const { user } = useAuth()

  const postsCollection = collection(db, "posts")

  const navigate = useNavigate()

  const handlePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isLoading) return

    setLoading(true)

    const doc = await addDoc(postsCollection, {
      title,
      content,
      author: {
        name: user?.displayName,
        id: user?.uid,
      },
    })

    setLoading(false)

    navigate(`/post/${doc.id}`)
  }

  return (
    <div>
      <Header />

      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-full max-w-[500px] flex flex-col gap-4 items-center bg-white p-4 py-16">
          <h1 className="text-3xl font-bold text-center">New Post</h1>

          <form
            onSubmit={handlePost}
            className="w-full max-w-[300px] flex flex-col gap-4"
          >
            <label className="flex flex-col">
              <span className="px-2 mb-1">Title</span>
              <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-md border-gray-500 placeholder-gray-500 p-2"
              />
            </label>

            <label className="flex flex-col">
              <span className="px-2 mb-1">Content</span>
              <textarea
                placeholder="Post Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border rounded-md border-gray-500 placeholder-gray-500 p-2"
              ></textarea>
            </label>

            <button
              type="submit"
              name="Submit Post"
              className="flex items-center justify-center border bg-blue-500 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-500"
              disabled={isLoading}
            >
              {isLoading ? <CgSpinner className="animate-spin" /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewPostPage
