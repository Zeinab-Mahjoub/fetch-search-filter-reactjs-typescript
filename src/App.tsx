import React, { useEffect, useState } from "react";
import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button } from "@material-ui/core";
import { Group } from "@material-ui/icons";
import useStyles from './styles';
import { alpha, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    // search
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    // select gender
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);


const App = () => {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [age, setAge] = React.useState('');
  const [foo, setFoo] = useState<any[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  }

  useEffect(() => {
    fetch('http://localhost:4000/users')
      .then(res => {
        return res.json()
          .then(data => {
            setFoo(data);
          })
      })
  }, [])

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>

          <Group className={classes.icon} />
          <Typography>
            Users
          </Typography>

          {/*------------------- search ----------------------*/}

          <div className={classes2.search}>
            <div className={classes2.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes2.inputRoot,
                input: classes2.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          {/* select gender */}
          <FormControl className={classes2.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Gender filter
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={age}
              onChange={handleChange}
              displayEmpty
              className={classes2.selectEmpty}
            >
              <MenuItem value="all">
                <em>All</em>
              </MenuItem>
              <MenuItem value={10}>Male</MenuItem>
              <MenuItem value={20}>Female</MenuItem>
            </Select>
            <FormHelperText>Select gender</FormHelperText>
          </FormControl>

        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.container}>
          <Container maxWidth="sm" >
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              Users
            </Typography>

          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {foo?.map((record) => (
              <Grid item key={record.id} xs={12} sm={6} md={4}>

                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={record.avatar}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      {record.first_name + " " + record.last_name}
                    </Typography>
                    <Typography gutterBottom>
                      {record.email}
                    </Typography>
                    <Typography variant="subtitle1">
                      {record.gender}
                    </Typography>
                  </CardContent>
                </Card>

              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          something here to give the footer a purpose.
        </Typography>
      </footer>
    </>
  )
}

export default App;