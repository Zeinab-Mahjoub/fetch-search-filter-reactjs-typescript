import React, { useEffect, useState } from "react";
import { Typography, AppBar, Card, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from "@material-ui/core";
import { Group } from "@material-ui/icons";
import useStyles from './styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {matchSorter} from 'match-sorter';
import useStyles2 from './styles2';

const App = () => {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [filter, setFilter] = React.useState('');
  const [foo, setFoo] = useState<any[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as string);
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

  console.log(matchSorter(foo, 'Trace Grinaugh', {keys: ['first_name', 'last_name']}))

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
              value={filter}
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