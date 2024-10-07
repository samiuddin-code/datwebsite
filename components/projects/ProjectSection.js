import { useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Card,
  CardMedia,
  Box,
  Typography,
  Button,
  SvgIcon,
} from '@mui/material';
import ExternalImage from '@/ui/ExternalImage'; // External image loader
import SectionHeader from '@/ui/SectionHeader'; // Custom section header component

// Arrow Icon Component
const ArrowIcon = () => (
  <SvgIcon sx={{ marginLeft: 1 }}>
    <path d="M4 12h16m0 0l-8 8m8-8l-8-8" stroke="currentColor" strokeWidth="2" fill="none" />
  </SvgIcon>
);

function ProjectSection({ projects }) {
  const [activeTab, setActiveTab] = useState(0);
  const [projectData] = useState(projects.data.rows);

  // Handle tab switch
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', py: 8 }}>
      <Container maxWidth={false} sx={{ width: '100%', maxWidth: '1450px', mx: 'auto' }}>
        <SectionHeader
          span="Latest Design"
          heading="Featured Projects"
        />

        {/* Full-Width Tabs for categories */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth" // Full width variant
          sx={{ marginBottom: 4, borderBottom: '1px solid #ddd' }}
        >
          <Tab label="Retail Design" />
          <Tab label="Architectural Design" />
          <Tab label="Interior Design" />
          <Tab label="Villa Design" />
        </Tabs>

        {/* Conditional Rendering based on the active tab */}
        {activeTab === 0 && (
          <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <CardMedia
              component="div"
              sx={{ height: 500, position: 'relative' }}
            >
              <ExternalImage
                src={projectData[0].altImage} // Retail Design project
                alt={projectData[0].title}
                layout="fill"
                objectFit="cover"
                style={{ transition: 'transform 0.5s ease' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  color: '#fff',
                  p: 3,
                  background: 'rgba(0,0,0,0.6)',
                }}
              >
                <Typography variant="h6">{projectData[0].title}</Typography>
                <Typography variant="body2">{projectData[0].highlight}</Typography>
                <Typography variant="body2">{projectData[0].size}</Typography>
              </Box>
            </CardMedia>
          </Card>
        )}

        {activeTab === 1 && (
          <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <CardMedia
              component="div"
              sx={{ height: 500, position: 'relative' }}
            >
              <ExternalImage
                src={projectData[1].altImage} // Architectural Design project
                alt={projectData[1].title}
                layout="fill"
                objectFit="cover"
                style={{ transition: 'transform 0.5s ease' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  color: '#fff',
                  p: 3,
                  background: 'rgba(0,0,0,0.6)',
                }}
              >
                <Typography variant="h6">{projectData[1].title}</Typography>
                <Typography variant="body2">{projectData[1].highlight}</Typography>
                <Typography variant="body2">{projectData[1].size}</Typography>
              </Box>
            </CardMedia>
          </Card>
        )}

        {activeTab === 2 && (
          <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <CardMedia
              component="div"
              sx={{ height: 500, position: 'relative' }}
            >
              <ExternalImage
                src={projectData[2].altImage} // Interior Design project
                alt={projectData[2].title}
                layout="fill"
                objectFit="cover"
                style={{ transition: 'transform 0.5s ease' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  color: '#fff',
                  p: 3,
                  background: 'rgba(0,0,0,0.6)',
                }}
              >
                <Typography variant="h6">{projectData[2].title}</Typography>
                <Typography variant="body2">{projectData[2].highlight}</Typography>
                <Typography variant="body2">{projectData[2].size}</Typography>
              </Box>
            </CardMedia>
          </Card>
        )}

        {activeTab === 3 && (
          <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <CardMedia
              component="div"
              sx={{ height: 500, position: 'relative' }}
            >
              <ExternalImage
                src={projectData[3].altImage} // Villa Design project
                alt={projectData[3].title}
                layout="fill"
                objectFit="cover"
                style={{ transition: 'transform 0.5s ease' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  color: '#fff',
                  p: 3,
                  background: 'rgba(0,0,0,0.6)',
                }}
              >
                <Typography variant="h6">{projectData[3].title}</Typography>
                <Typography variant="body2">{projectData[3].highlight}</Typography>
                <Typography variant="body2">{projectData[3].size}</Typography>
              </Box>
            </CardMedia>
          </Card>
        )}

        {/* Button to see more */}
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Button
            variant="contained"
            href="/projects"
            sx={{ backgroundColor: '#18784c', color: 'white' }}
          >
            See All Projects <ArrowIcon />
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectSection;
