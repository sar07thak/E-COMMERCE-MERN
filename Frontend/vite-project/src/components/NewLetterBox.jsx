import React from 'react'

function NewLetterBox() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here
  }

  return (
    <div className='w-full bg-[#f6f2ff] py-12 px-4 flex flex-col items-center gap-4'>
      <p className='text-[20px] md:text-[28px] text-[#1f2937] font-semibold text-center px-4'>
        Subscribe now & get 20% off
      </p>
      <p className='text-[14px] md:text-[18px] text-[#374151] text-center max-w-[700px] px-4'>
        Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
      </p>

      <form onSubmit={handleSubmit} className='w-full max-w-[700px] flex flex-col md:flex-row items-center justify-center gap-4 mt-6 px-4'>
        <input
          type="email"
          placeholder="Enter Your Email"
          required
          className='w-full md:max-w-[70%] h-[45px] px-4 rounded-lg border border-gray-300 shadow-sm text-[#111827] placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-300'
        />
        <button
          type="submit"
          className='text-white bg-[#3b82f6] hover:bg-[#2563eb] transition duration-200 px-6 py-2 rounded-lg shadow-sm font-medium'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewLetterBox
