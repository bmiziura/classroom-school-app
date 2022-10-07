import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
} from "firebase/firestore"
import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header"
import { db } from "../firebase"

import { CgSpinner } from "react-icons/cg"
import { MdDelete } from "react-icons/md"
import { useAuth } from "../contexts/AuthContext"

const PostViewPage = () => {
  const [post, setPost] = useState<DocumentData>()

  const { id } = useParams()

  const { user } = useAuth()

  const postsCollection = collection(db, "posts")

  const navigate = useNavigate()

  useEffect(() => {
    const getPost = async () => {
      const document = await getDoc(doc(postsCollection, id))

      const data = document.data()

      if (!data) {
        navigate("/")
        return
      }

      setPost(data)
    }
    getPost()
  }, [])

  const handleRemove = async () => {
    await deleteDoc(doc(postsCollection, id))

    navigate("/")
  }

  return (
    <div>
      <Header />

      <div className="container mx-auto">
        <div className="">
          {post ? (
            <div className="relative bg-white p-4">
              <h1 className="font-bold text-4xl">{post.title}</h1>

              <p className="my-4 ">{post.content}</p>

              <div>
                <span>Autor:</span>
                <span>{post.author.name}</span>
              </div>

              {user && post.author.id === user.uid && (
                <button
                  className="absolute right-4 top-4 text-red-500 cursor-pointer"
                  onClick={handleRemove}
                  name={`Delete Post: ${post.title}`}
                >
                  <MdDelete className="w-8 h-8" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <CgSpinner className="animate-spin h-16 w-16" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostViewPage
