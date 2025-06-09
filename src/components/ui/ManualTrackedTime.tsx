function ManualTrackedTime() {
    return (
        <div className=" px-8 shadow-md w-full h-[95px] bg-white mt-2">
            <p className="text-bold">Today</p>
            <div className="flex gap-20">
                <p>Typing</p>
                <div className="flex">
                    <p>Typing</p>
                    <p>The Gym</p>
                </div>
                <div className="flex">
                    <p> 20:30 - 3:00PM</p>
                    <p>1:00:00</p>
                </div>
            </div>
        </div>
    )
}

export default ManualTrackedTime
