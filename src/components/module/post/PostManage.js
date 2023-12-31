import { useEffect, useState } from "react";
import { Dropdown } from "../../base/dropdown";
import { Button, LabelStatus, Table } from "../../index";
import React from "react";
import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, startAfter, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { ActionDelete, ActionEdit, ActionView } from "../../action";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { categoryStatus, postStatus, userRole } from "../../../utils/constants";
import { useAuth } from "../../../contexts/auth-context";

const POST_PER_PAGE = 3;
const PostManage = () => {
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState({});
  const [total, setTotal] = useState(0);
  const [selectCategory, setSelectCategoty] = useState("");
  const [categories, setCategoties] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  // get categories data
  useEffect(() => {
    document.title = "Blogging App - Manager post"
    async function getData() {
      const colRef = collection(db, "categories")
      const q = query(colRef, where("status", "==", categoryStatus.APPROVED))
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data()
        })
      });
      setCategoties(result);
    }
    getData();
  }, []);
  //get post
  useEffect(() => {
    async function fetchData() {
      const colref = collection(db, "posts");
      let newRef;
      if (Number(userInfo?.role) !== userRole.ADMIN) {
        newRef = query(colref, where("user.id", "==", userInfo?.uid));
      }
      else {
        newRef = query(colref, limit(POST_PER_PAGE));
        // newRef = query(colref, where("category.id", "==", selectCategory?.id));
      }
      const documentSnapshots = await getDocs(newRef);
      // Get the last visible document (truoc)
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colref, snapshot => {
        setTotal(snapshot.size)
      })
      // sd onSnapshot - realtime
      onSnapshot(newRef, snapshot => {
        let result = [];
        snapshot.forEach(doc => {
          result.push({
            id: doc.id,
            ...doc.data()
          })
        })
        if (selectCategory?.id) {
          result = result.filter(function (post) {
            if (post?.category?.id === selectCategory?.id) {
              return post;
            }
            return null;
          })
        }
        if (filter) {
          result = result.filter(function (post) {
            if (post?.title.includes(filter)) {
              return post;
            }
            return null;
          })
        }
        setPostList(result);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter, selectCategory, userInfo?.role, userInfo?.uid]);
  // this func is used for handling debounce input filter
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000)
  //this func is used for selecting item for dropdown
  const handleClickOptionDropdown = async (item) => {
    setSelectCategoty(item)
  };
  // this func is used for deleting category
  const handleDeleteCategory = async (postId) => {
    try {
      const docRef = doc(db, "posts", postId);
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(docRef);
          Swal.fire(
            'Deleted!',
            'Your post has been deleted.',
            'success'
          )
          toast.success("Delete post successfully!!!")
        }
      })
    } catch (error) {
      console.log(error);
      toast.error("Delete post failed!!!")
    }
  }
  // this func is used for rendering status of post
  const handleRenderPostStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>
      case postStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>
      case postStatus.REJECTED:
        return <LabelStatus type="danger">Rejectde</LabelStatus>
      default:
        break;
    }
  }

  // this func is used for handling load more post
  const handleLoadMorePost = async () => {
    // Construct a new query starting at this document,
    const nextRef = query(collection(db, "posts"),
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE));
    onSnapshot(nextRef, snapshot => {
      const result = [];
      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setPostList([...postList, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);

    // Get the last visible document (truoc)
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    // set lai last doc truoc do
    setLastDoc(lastVisible);
  }
  // phan quyen chi admin moi ca the truy cap
  // if (+userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="dashboard-heading">Manage post</h1>

        <Button to="/manage/add-post" className="header-button" height="52px">
          Write new post
        </Button>
      </div>

      <div className="mb-6 flex gap-x-6  items-center justify-end">
        <Dropdown >
          <Dropdown.Select placeholder="Select status post"></Dropdown.Select>
          <Dropdown.List>
            {categories?.length > 0 && categories.map(category => (
              <Dropdown.Option
                key={category.id}
                onClick={() => handleClickOptionDropdown(category)}
              >
                {category.name}
              </Dropdown.Option>
            ))}
          </Dropdown.List>
        </Dropdown>
        <div className="w-full max-w-[300px] h-[55px]">
          <input
            type="text"
            className="w-full px-4 h-full rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
            onChange={handleInputFilter}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList?.length > 0 && postList.map(post => (
            <tr key={post.id}>
              <td>{post.id.slice(0, 6) + "..."}</td>
              <td>
                <div className="flex items-center gap-x-3">
                  <img
                    src={post.image}
                    alt=""
                    className="w-[66px] h-[55px] rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{post.title.slice(0, 26) + "..."}</h3>
                    <time className="text-sm text-gray-500">
                      Date: {new Date(post?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
                    </time>
                  </div>
                </div>
              </td>
              <td>
                <span className="text-gray-500">{post.category.name}</span>
              </td>
              <td>
                <span className="text-gray-500">{post.user.fullname}</span>
              </td>
              <td>
                {handleRenderPostStatus(+post.status)}
              </td>
              <td>
                <div className="flex items-center gap-x-3 text-gray-500">
                  <ActionView onClick={() => navigate(`/${post.slug}`)}></ActionView>
                  <ActionEdit
                    onClick={() => navigate(`/manage/update-post?id=${post.id}`)}
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => handleDeleteCategory(post.id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {total > postList.length && <div className="mt-10 w-[200px] mx-auto">
        <Button
          onClick={handleLoadMorePost}>Load more</Button>
        {/* <Pagination></Pagination> */}
      </div>}
    </div>
  );
};

export default PostManage;
