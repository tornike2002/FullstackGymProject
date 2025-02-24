import { useState } from "react";
import AdminBlogsAddingContainer from "../../blogs/AdminBlogsAddingContainer";
import AdminBlogsContainer from "../../blogs/AdminBlogsContainer";
import AdminBlogsEditContainer from "../../blogs/AdminBlogsEditContainer";

const AdminBlogs = () => {
  const [openPage, setOpenPage] = useState(false);
  const [editOpenPage, setEditOpenPage] = useState(false);
  const [blogsId, setBlogsId] = useState(null);

  return (
    <div className="lg:p-[82px]    text-[#FFF] font-Nunito p-[22px] ">
      <div className="flex items-center justify-between font-bold">
        <h3 className="text-[22px] md:hidden flex">Add Blogs</h3>
        <div className="md:block hidden">
          <h3 className="text-[22px]">Add Blogs</h3>
          <p className="text-[15px] font-normal">Add Blogs for your clients</p>
        </div>
        <button
          className="md:hidden block w-[30px] h-[30px] cursor-pointer text-black bg-[#D7FD44] rounded-[50%] font-bold text-[20px] "
          onClick={() => setOpenPage(true)}
        >
          +
        </button>
        <button
          className="md:block hidden w-[195px] h-[42px] cursor-pointer text-[#D7FD44]  rounded-[24px] font-bold text-[15px] p-[10px] border border-[#D7FD44] "
          onClick={() => setOpenPage(true)}
        >
          + Add Blogs
        </button>
      </div>

      <div className="flex flex-col justify-between items-center mt-[30px] ">
        <div className="w-full ">
          <AdminBlogsContainer
            editOpenPage={editOpenPage}
            setEditOpenPage={setEditOpenPage}
            setBlogsId={setBlogsId}
          />
        </div>
      </div>
      {openPage && (
        <AdminBlogsAddingContainer
          openPage={openPage}
          setOpenPage={setOpenPage}
        />
      )}
      {editOpenPage && (
        <AdminBlogsEditContainer
          blogsId={blogsId}
          editOpenPage={editOpenPage}
          setEditOpenPage={setEditOpenPage}
        />
      )}
    </div>
  );
};

export default AdminBlogs;
