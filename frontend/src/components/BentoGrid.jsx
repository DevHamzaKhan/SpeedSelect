
const BentoGrid = () => {
  return (
    <div className="grid h-screen p-5  rounded-lg gap-5 grid-cols-5 grid-rows-4">
      <div className="rounded-lg px-12 justfiy-center items-end col-span-3 bg-gradient-to-l from-blue-600 to-blue-800  row-span-2">
        
      </div>
      <div className="rounded-lg col-span-2 px-6  bg-blue-400 row-span-2">
      </div>
      <div className="rounded-lg col-span-2 px-8 bg-blue-400 row-span-2">
      </div>
      <div className="rounded-lg relative col-span-3 px-12 pt-8  row-span-2 bg-gradient-to-r from-blue-600 to-blue-800 ">
      </div>
    </div>
  )
}

export default BentoGrid