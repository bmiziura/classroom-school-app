import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"

import { MdDelete } from "react-icons/md"

const PostCard = ({
  id,
  post,
  removePost,
}: {
  id: string
  post: DocumentData
  removePost: (id: string) => void
}) => {
  const { user } = useAuth()

  const postsCollection = collection(db, "posts")

  const handleRemove = async () => {
    await deleteDoc(doc(postsCollection, id))

    removePost(id)
  }

  return (
    <article
      className="group relative lg:first:col-span-2 h-full"
      title={post.title}
    >
      <Link to={`/post/${id}`}>
        <div className="flex flex-col justify-between h-full bg-white shadow-md p-4 hover:bg-gray-50">
          <div>
            <h2 className="font-bold text-xl">{post.title}</h2>
            <p className="my-4 line-clamp-3">{post.content}</p>
          </div>

          <span>
            <span className="font-bold">Autor:</span> {post.author.name}
          </span>
        </div>
      </Link>

      {user && post.author.id === user.uid && (
        <button
          className="lg:hidden group-hover:block absolute right-4 top-4 text-red-500 cursor-pointer"
          onClick={handleRemove}
          name={`Delete Post: ${post.title}`}
        >
          <MdDelete className="w-8 h-8" />
        </button>
      )}
    </article>
  )
}

const PostList = ({ searchText }: { searchText?: string }) => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>()

  const postsCollection = collection(db, "posts")

  const removePost = (id: string) => {
    setPosts(posts?.filter((post) => post.id !== id))
  }

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(
        searchText
          ? query(
              postsCollection,
              where("title", ">=", searchText),
              where("title", "<=", searchText + "z")
            )
          : postsCollection
      )

      console.log(data.docs)

      setPosts(data.docs)
    }

    getPosts()
  }, [searchText])

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-fr gap-4">
        {posts && posts.length === 0 && (
          <div>No posts with such criteria were found!</div>
        )}
        {posts?.map((doc) => (
          <PostCard
            key={doc.id}
            id={doc.id}
            post={doc.data()}
            removePost={removePost}
          />
        ))}
      </div>
    </div>
  )
}

export default PostList
