import React from 'react'

const Head = ({ userRole }) => {
    return (
        <div className='mb-12'>
            {
                userRole === "checker" ? (
                    <div className="text-center text-2xl font-semibold  bg-blue-400 text-white ">
                        :.e-Registration-Inspector Note.:
                    </div>
                ) : (
                    <div className="text-center text-2xl font-semibold  bg-blue-400 text-white">
                        :.e-Registration-Approval.:
                    </div>
                )
            }
        </div>
    )
}

export default Head