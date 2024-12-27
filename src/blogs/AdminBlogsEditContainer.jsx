import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useGetBlogById from "../hooks/useGetBlogById";
import { useEffect } from "react";
import useEditBlogs from "../hooks/useEditBlogs";
import StoryAboutSkeleton from "../components/skeletons/StoryAboutSkeleton";
import ErorrDisplay from "../components/erorr/ErorrDisplay";
function AdminBlogsEditContainer({ editOpenPage, setEditOpenPage, blogsId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data, isError } = useGetBlogById(blogsId);

  const {
    mutate: editBlog,
    isLoading: editLoading,
    error: editError,
  } = useEditBlogs();

  const menuVariants = {
    open: {
      y: 0,
      transition: { type: "spring", stiffness: 30 },
    },
    closed: {
      y: "100%",
      transition: { type: "spring", stiffness: 30 },
    },
  };

  useEffect(() => {
    if (data) {
      reset({
        author: data.data.author,
        description: data.data.description,
        title: data.data.title,
      });
    }
  }, [data, reset]);
  if (editLoading) {
    return <StoryAboutSkeleton />;
  }
  if (isError) {
    return <ErorrDisplay error={editError.message} />;
  }

  const onSubmit = (data) => {
    editBlog(
      {
        id: blogsId,
        editedBlogs: data,
      },
      {
        onSuccess: () => {
          reset();
          setEditOpenPage(false);
        },
      }
    );
  };

  return (
    <div className="relative z-10 font-Nunito text-[#FFF]">
      <motion.div
        className="fixed bottom-0 left-0 w-full h-[100vh] bg-[#121212] z-50 p-[24px] flex flex-col items-start overflow-y-auto"
        initial="closed"
        animate={editOpenPage ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="flex justify-between w-full border-b border-[#6F6F6F] mb-[10px]">
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-[25px] font-bold">Add Blogs</h1>
            <h3 className="text-[15px] font-[500] mb-[10px]">
              Edit Blogs you want
            </h3>
          </div>
          <button onClick={() => setEditOpenPage(false)}>
            <img
              src="/icons/adminRemove_svg.svg"
              alt="Close"
              className="w-[40px] h-[40px] cursor-pointer"
            />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-white w-full text-center mt-[41px] gap-[3.25rem] flex flex-col"
        >
          <div className="flex flex-col gap-[50px]">
            <div className="w-full">
              <h3 className="flex items-center mb-[20px] gap-[10px]">
                <span className="w-[8px] h-[8px] rounded-full bg-[#FFF] font-bold"></span>
                Type author
              </h3>
              <input
                className="w-full focus:outline-none focus:border-none flex p-[10px] items-center rounded-[8px] bg-[#323232]"
                type="text"
                {...register("author", {
                  required: "Author name is required",
                  pattern: {
                    value: /^[a-zA-Z\s-]+$/i,
                    message: "Only letters, spaces, and hyphens are allowed",
                  },
                })}
              />

              <div className="flex mt-[10px] font-bold">
                {errors.author && (
                  <span className="text-red-500">{errors.author.message}</span>
                )}
              </div>
            </div>

            <div className="w-full">
              <h3 className="flex items-center mb-[20px] gap-[10px]">
                <span className="w-[8px] h-[8px] rounded-full bg-[#FFF] font-bold"></span>
                Type description
              </h3>
              <textarea
                className="w-full focus:outline-none focus:border-none flex p-[10px] items-center rounded-[8px] bg-[#323232]"
                type="text"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
              />
              <div className="flex mt-[10px] font-bold">
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full">
              <h3 className="flex items-center mb-[20px] gap-[10px]">
                <span className="w-[8px] h-[8px] rounded-full bg-[#FFF] font-bold"></span>
                Type title
              </h3>
              <input
                className="w-full focus:outline-none focus:border-none flex p-[10px] items-center rounded-[8px] bg-[#323232]"
                type="text"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters",
                  },
                })}
              />
              <div className="flex mt-[10px] font-bold">
                {errors.title && (
                  <span className="text-red-500">{errors.title.message}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              className="max-w-[195px] w-full text-[#D7FD44] h-[42px] border border-[#D7FD44] rounded-[24px]"
              type="submit"
            >
              + Edit Blogs
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminBlogsEditContainer;
