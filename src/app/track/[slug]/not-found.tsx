import Link from 'next/link'
import React from "react";
import "./notFoundStyles.scss";

function NotFound() {

    return (
        <div className="content_not_found">
            <div id="content_404">
                {/*4*/}
                <div className="number_4">
                    <svg version="1.1" id="number_four" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 193.9 333.7">
                        <g id="four">
                            <g>
                                <path
                                    className="nFour"
                                    d="M0,265.4c0-5.5,1.5-14.2,3.4-19.4L89.1,9.4C91,4.2,97,0,102.5,0h14.4c5.5,0,8.5,4.2,6.7,9.4l-83,233.8
              c-1.8,5.2,1.2,9.4,6.7,9.4h136.7c5.5,0,10,4.5,10,10v9.6c0,5.5-4.5,10-10,10H10c-5.5,0-10-4.5-10-10V265.4z M133.6,147.2
              c0-5.5,4.5-10,10-10h11.9c5.5,0,10,4.5,10,10v176.4c0,5.5-4.5,10-10,10h-11.9c-5.5,0-10-4.5-10-10V147.2z"
                                />
                            </g>
                        </g>
                    </svg>
                </div>
                {/*0*/}
                <div className="number_0">
                    <svg version="1.1" id="NotFound" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 338 338">
                        <style type="text/css"></style>
                        <circle id="circle_nf3" className="st0" cx="169" cy="169" r="169" />
                        <circle id="circle_nf2" className="st0" cx="169" cy="169" r="139.5" />
                        <circle id="circle_nf1" className="st1" cx="169" cy="169" r="111.5" />
                        <g id="face">
                            <ellipse className="st2" cx="126.8" cy="151.8" rx="15.9" ry="20.6" />
                            <ellipse className="st2" cx="213.3" cy="152.3" rx="15.9" ry="20.6" />
                            <path
                                className="st2"
                                d="M201.2,213.1c0,9.3-13,16.8-29,16.8s-29-7.5-29-16.8c0-8.1,9.7-14.8,22.8-16.4c2.1-0.3,4.2-0.4,6.3-0.4
          c3.5,0,7,0.4,10.4,1.1C193.5,199.8,201.2,205.9,201.2,213.1z"
                            />
                            <path
                                className="st3"
                                d="M182.9,198.8c0,1.2-0.4,2.3-1.2,3.2c-0.8,0.8-1.8,1.3-3,1.3h-9.4c-2.4-0.1-4.3-2.1-4.2-4.5
          c0-0.9,0.3-1.8,0.8-2.6c2.1-0.3,4.2-0.4,6.3-0.4c3.5,0,7,0.4,10.4,1.2C182.8,197.6,182.9,198.2,182.9,198.8z"
                            />
                            <circle className="st3" cx="130.5" cy="141.5" r="4.7" />
                            <circle className="st3" cx="217.6" cy="141.5" r="4.7" />
                            <circle className="st4" cx="222.2" cy="185.5" r="4.7" />
                            <circle className="st4" cx="108.1" cy="185.5" r="4.7" />
                        </g>
                    </svg>
                </div>
                {/*4*/}
                <div className="number_4">
                    <svg version="1.1" id="number_four" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 193.9 333.7">
                        <g id="four">
                            <g>
                                <path
                                    className="nFour"
                                    d="M0,265.4c0-5.5,1.5-14.2,3.4-19.4L89.1,9.4C91,4.2,97,0,102.5,0h14.4c5.5,0,8.5,4.2,6.7,9.4l-83,233.8
              c-1.8,5.2,1.2,9.4,6.7,9.4h136.7c5.5,0,10,4.5,10,10v9.6c0,5.5-4.5,10-10,10H10c-5.5,0-10-4.5-10-10V265.4z M133.6,147.2
              c0-5.5,4.5-10,10-10h11.9c5.5,0,10,4.5,10,10v176.4c0,5.5-4.5,10-10,10h-11.9c-5.5,0-10-4.5-10-10V147.2z"
                                />
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
            <div className="info_not_found">
                <p>Not Found</p>
                <Link href="/">
                    Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;