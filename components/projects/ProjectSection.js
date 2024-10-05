import { useState } from 'react';
import { text_portion } from '@/helpers/helpers';
import ExternalImage from '@/ui/ExternalImage';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CircularProgress,
    Container,
    Box,
    Grow,
    SvgIcon,
    Divider,
} from '@mui/material';
import SectionHeader from '@/ui/SectionHeader';

// Arrow icon component
const ArrowIcon = () => (
    <SvgIcon sx={{ marginLeft: 1 }}>
        <path d="M4 12h16m0 0l-8 8m8-8l-8-8" stroke="currentColor" strokeWidth="2" fill="none" />
    </SvgIcon>
);

function ProjectSection({ projects }) {
    const [page, setPage] = useState(2);
    const [projectData, setProjectData] = useState(projects.data.rows);
    const [preloader, setPreloader] = useState(false);
    const path = useRouter();

    async function fetchData(pageNumber) {
        const endpoint = projects.data.category
            ? `${process.env.API_DOMAIN}/projects/category/${projects.data.category.slug}?limit=6&page=${pageNumber}`
            : `${process.env.API_DOMAIN}/projects?limit=6&page=${pageNumber}`;

        const response = await axios.get(endpoint);
        return response.data;
    }

    function loadData() {
        setPage(page + 1);
        setPreloader(true);
        fetchData(page).then(response => {
            setProjectData(prevVal => [...prevVal, ...response.data.rows]);
            setPreloader(false);
        }).catch(error => {
            console.error('Error loading data:', error);
            setPreloader(false);
        });
    }

    return (
        <Box sx={{ width: '100%', py: 8 }}> {/* Full width container */}
            <Container maxWidth={false} sx={{ width: '100%', maxWidth: '1450px', mx: 'auto' }}>
                <SectionHeader
                    span="Latest Design"
                    heading={(projects.data.category ? projects.data.category.title : "Featured") + " Projects"}
                />
                <Grid container spacing={4}>
                    {projectData.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={item.title}>
                            <Grow in={true} timeout={(index + 1) * 300}>
                                <Card
                                    elevation={6}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        overflow: 'hidden',
                                        borderRadius: '16px',
                                        transition: 'transform 0.3s ease',
                                        background: 'linear-gradient(145deg, #ffffff, #e3e3e3)', // Light gradient background
                                        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)', // Subtle shadow
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 16px 30px rgba(0, 0, 0, 0.25)', // Deeper shadow on hover
                                            '& .MuiCardMedia-root img': {
                                                transform: 'scale(1.1)', // Image zoom effect
                                                transition: 'transform 0.5s ease-in-out',
                                                opacity: 0.9, // Slight opacity change
                                            },
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            height: 310,
                                            position: 'relative',
                                            '&:hover img': {
                                                filter: 'blur(2px)',
                                                transition: 'filter 0.3s ease-in-out',
                                            },
                                        }}
                                    >
                                        <ExternalImage
                                            src={item.altImage}
                                            alt={item.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="absolute top-0 left-0"
                                            style={{
                                                transition: 'transform 0.5s ease',
                                            }}
                                        />
                                    </CardMedia>
                                    <CardContent
  sx={{
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }}
>
  <Typography variant="h6" component="div" gutterBottom>
    {item.title}
  </Typography>
  
  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
    {text_portion(item.highlight, 0, 100)}
  </Typography>

  {/* Divider between description and button */}
  <Box sx={{ my: 2 }}>
    <hr style={{ border: 'none', height: '1px', backgroundColor: '#ddd' }} />
  </Box>

  <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', mt: 'auto' }}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#18784c', // Set button color
        color: 'white',
        width: '100%',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        '&:hover': {
          backgroundColor: '#155f3c', // Darker shade for hover
          transform: 'scale(1.05)',
        },
      }}
      href={`/projects/${item.ProjectCategory.slug}/${item.slug}`}
    >
      See more <ArrowIcon />
    </Button>
  </Box>
</CardContent>


                                </Card>
                            </Grow>
                        </Grid>
                    ))}
                </Grid>

                {/* Load more and view all buttons */}
                <Box className="mt-4 flex justify-between">
                    {projects.data.count !== projectData.length && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={loadData}
                            disabled={preloader}
                            sx={{
                                mt: 4,
                                width: '100%',
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#18784c',
                                    color: 'white',
                                },
                            }}
                        >
                            {preloader ? <CircularProgress size={24} /> : "Load More"} <ArrowIcon />
                        </Button>
                    )}
                    {path.asPath === "/" && (
                        <Button
                            variant="text"
                            color="primary"
                            href="/projects"
                            sx={{
                                mt: 4,
                                width: '100%',
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#18784c',
                                    color: 'white',
                                },
                            }}
                        >
                            View all projects <ArrowIcon />
                        </Button>
                    )}
                </Box>
            </Container>
        </Box>
    );
}

export default ProjectSection;
