import React from "react";

export function ResumeSkeleton() {
    return (
        <div className="w-full flex justify-center pointer-events-none">
            <div className="w-full flex flex-col gap-6 animate-pulse items-start text-left">
                
                {/* Title and Contacts */}
                <div className="w-full flex flex-col gap-2 pb-4 items-start text-left">
                    <div className="h-10 md:h-12 bg-gray-300 rounded w-3/4 md:w-1/2 mb-2"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/2 md:w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full max-w-[600px] mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 max-w-[400px]"></div>
                </div>

                {/* Profile Paragraph */}
                <div className="w-full flex flex-col gap-2 mt-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>

                {/* Professional Experience */}
                <div className="w-full flex flex-col gap-6 mt-8">
                    <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
                    
                    {/* Job 1 */}
                    <div className="w-full flex flex-col gap-2">
                        <div className="h-5 bg-gray-300 rounded w-3/4 md:w-1/2"></div>
                        <div className="flex flex-col gap-2 pl-6 mt-2">
                            <div className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></div><div className="h-4 bg-gray-200 rounded w-full"></div></div>
                            <div className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></div><div className="h-4 bg-gray-200 rounded w-11/12"></div></div>
                            <div className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></div><div className="h-4 bg-gray-200 rounded w-5/6"></div></div>
                        </div>
                    </div>

                    {/* Job 2 */}
                    <div className="w-full flex flex-col gap-2 mt-4">
                        <div className="h-5 bg-gray-300 rounded w-2/3 md:w-5/12"></div>
                        <div className="flex flex-col gap-2 pl-6 mt-2">
                            <div className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></div><div className="h-4 bg-gray-200 rounded w-full"></div></div>
                            <div className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></div><div className="h-4 bg-gray-200 rounded w-11/12"></div></div>
                            <div className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></div><div className="h-4 bg-gray-200 rounded w-4/5"></div></div>
                        </div>
                    </div>
                </div>

                {/* Education */}
                <div className="w-full flex flex-col gap-6 mt-8">
                    <div className="h-8 bg-gray-300 rounded w-40 mb-2"></div>
                    <div className="flex flex-col gap-1 pl-6">
                        <div className="h-4 bg-gray-300 rounded w-2/3 md:w-1/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 md:w-1/4 mt-1"></div>
                    </div>
                    <div className="flex flex-col gap-1 pl-6 mt-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4 md:w-2/5"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 md:w-1/3 mt-1"></div>
                    </div>
                </div>

                {/* Skills */}
                <div className="w-full flex flex-col gap-3 mt-8">
                    <div className="h-8 bg-gray-300 rounded w-24 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
        </div>
    );
}
