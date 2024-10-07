import Moment from 'react-moment';
import Link from 'next/link';
import SectionHeader from '@/ui/SectionHeader';
import ExternalImage from '@/ui/ExternalImage';

const BlogSection = ({ data }) => {
    return (
        <section className="py-8 lg:py-12">
            <div className="max-w-6xl mx-auto px-8">
                <SectionHeader span="Powered by engineers" heading="News &amp; Blog" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.slice(0, 6).map((item, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                            <Link href={`/blog/${item.slug}`}>
                                <div>
                                    <div className="relative h-80 w-full">
                                        <ExternalImage
                                            layout="fill"
                                            objectFit="cover"
                                            className="transition-transform duration-300 transform group-hover:scale-105"
                                            alt={item.title}
                                            src={item.altImage}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                                    </div>
                                    <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-3 py-1 rounded-full text-sm font-semibold">
                                        {item.type || 'Blog'}
                                    </div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <Moment format="DD/MM/YYYY" className="block text-sm mb-2" >{item.createdAt}</Moment>
                                        <h2 className="text-lg font-bold leading-tight">{item.title}</h2>
                                        <div className="mt-2 flex items-center text-sm underline">
                                            <span>See more</span>
                                            <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
