import {Typography, Breadcrumbs, Link, Box} from '@mui/material';

export default function BasicBreadcrumbs(props: any) {

    const lastIndex = props.breadcrumb.length - 1;
    return (
        <Box sx={{ mb: 5 }}>
            <Breadcrumbs aria-label="breadcrumb">
            {props.breadcrumb.map((item: any, index: number) =>(
                <div>
                {lastIndex != index ? 
                    <Link
                        underline="hover"
                        color="inherit"
                        href={item.url}
                    >
                        {item.title}
                    </Link>
                    :
                    <Typography color="text.primary">{item.title}</Typography>
                }
                </div>
            ))}
            </Breadcrumbs>
        </Box>
    );
}