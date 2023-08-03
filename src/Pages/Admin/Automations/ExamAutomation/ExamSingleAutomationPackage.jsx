
import React from 'react'
import ExamPanel from './ExamPanel'

const ExamSingleAutomationPackage = ({ item, tags, items, singleAutService, altSingleAutService }) => {
    return (
        <>
            <div className="bg-white p-3.5 rounded-lg mb-1">
                <div className="grid grid-cols-2">
                    <div className="">
                        <div className="text-sm">{item.title} = &#8358;{item.price}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <ExamPanel 
                        singleAutService={singleAutService}
                        id={item.automation}
                        items={items}
                        tag={tags.main}
                        />
                        <ExamPanel 
                        singleAutService={altSingleAutService}
                        id={item.altAutomation}
                        items={items}
                        tag={tags.alternate}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExamSingleAutomationPackage