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
import { matchSorter } from 'match-sorter';
import useStyles2 from './styles2';
import { User } from "./types/user";

const App = () => {
  const classes = useStyles();
  const classes2 = useStyles2();

  // variables
  let inputValue = '';

  //------------------- states --------------------
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [inputSearch, setInputSearch] = React.useState('');
  const [filterGender, setFilterGender] = React.useState('');


  const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterGender(event.target.value as string);
  }

  useEffect(() => {
    fetch('http://localhost:4000/users')
      .then(res => {
        return res.json()
          .then(data => {
            setUsers(data);
          });
      });
  }, []);

  // --------------- match-sorter ---------------
  function matchSorterAcrossKeys(list: any[], search: string, options: { keys: string[] }) {
    const joinedKeysString = (item: any) => options.keys.map(key => item[key]).join(' ');
    return matchSorter(list, search, {
      ...options,
      keys: [...options.keys, joinedKeysString],
    });
  }

  const handleChangeInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    inputValue = (event.target.value as string);
    setInputSearch(inputValue);

  }
  // --------------- end match-sorter ---------------
  
  
  // --------- when genderFilter or searchInput changes ------------
  useEffect(() => {
    let nameMatches = matchSorterAcrossKeys(users, inputSearch, { keys: ['first_name', 'last_name',] });
    setFilteredUsers(nameMatches);

    
 
  }, [inputSearch, filterGender]);
  // --------- end when genderFilter or searchInput changes ------------


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
              onChange={handleChangeInput}
              placeholder="Search…"
              classes={{
                root: classes2.inputRoot,
                input: classes2.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          {/*--------------- filter select gender -------------*/}

          <FormControl className={classes2.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Gender filter
            </InputLabel>

            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={filterGender}
              onChange={handleChangeSelect}
              displayEmpty
              className={classes2.selectEmpty}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>

            <FormHelperText>Select gender</FormHelperText>
          </FormControl>

        </Toolbar>
      </AppBar>

      {/*----------------- users and results ----------------*/}
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
            {users?.map((record) => (
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

      {/*---------------------------- footer ----------------------------*/}
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