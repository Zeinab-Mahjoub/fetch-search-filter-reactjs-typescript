import React, { useEffect, useState } from "react";
import {
  Typography,
  AppBar,
  CssBaseline,
  Toolbar,
  Container,
} from "@material-ui/core";
import { Group } from "@material-ui/icons";
import useStyles from "./styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { matchSorter } from "match-sorter";
import useStyles2 from "./styles2";
import { User } from "./types/user";
import "./UsersList.css";

const UsersList = () => {
  const classes = useStyles();
  const classes2 = useStyles2();

  //------------------- states --------------------
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [inputSearch, setInputSearch] = React.useState("");
  const [filterGender, setFilterGender] = React.useState("");

  const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterGender(event.target.value as string);
  };

  useEffect(() => {
    fetch("http://localhost:4000/users").then((res) => {
      return res.json().then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      });
    });
  }, []);

  // --------------- match-sorter ---------------
  function matchSorterAcrossKeys(
    list: any[],
    search: string,
    options: { keys: string[] }
  ) {
    const joinedKeysString = (item: any) =>
      options.keys.map((key) => item[key]).join(" ");
    return matchSorter(list, search, {
      ...options,
      keys: [...options.keys, joinedKeysString],
    });
  }

  // --------------- end match-sorter ---------------

  // --------- when genderFilter or searchInput changes ------------
  useEffect(() => {
    let newFilteredUsers = users;

    // Step1: filter based on search input
    newFilteredUsers = matchSorterAcrossKeys(newFilteredUsers, inputSearch, {
      keys: ["first_name", "last_name"],
    });

    // step2:
    if (filterGender) {
      newFilteredUsers = matchSorter(newFilteredUsers, filterGender, {
        keys: [{ threshold: matchSorter.rankings.EQUAL, key: "gender" }],
      });
    }

    setFilteredUsers([...newFilteredUsers]);
  }, [inputSearch, filterGender]);
  // --------- end when genderFilter or searchInput changes ------------

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Group className={classes.icon} />
          <Typography>Users</Typography>

          {/*------------------- search ----------------------*/}

          <div className={classes2.search}>
            <div className={classes2.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={(e) => setInputSearch(e.currentTarget.value)}
              placeholder="Search…"
              classes={{
                root: classes2.inputRoot,
                input: classes2.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={inputSearch}
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
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Users
            </Typography>
          </Container>
        </div>
        <div className="cardsContainer">
          {filteredUsers?.map((record) => (
            <div className="itemBox">
              <img src={record.avatar} alt={record.first_name} />
              <h4>{`${record.first_name} ${record.last_name}`}</h4>
              <div>{record.email}</div>
              <div>{record.gender}</div>
            </div>
          ))}
        </div>
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
  );
};

export default UsersList;
