import React, { PureComponent } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NewTask from "../NewTask/NewTask";
import Task from "../Task/Task";
import Confirm from "../Confirm";
import EditTaskModal from "../EditTaskModal";
import { connect } from "react-redux";
import { getTasks, removeTasks } from "../../store/actions";
import Footer from "./Footer/Footer";

class ToDo extends PureComponent {
  state = {
    checkedTasks: new Set(),
    showConfirm: false,
    editTask: null,
    openNewTaskModal: false,
  };

  componentDidMount() {
    this.props.getTasks();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
      this.setState({
        openNewTaskModal: false,
      });
    }

    if (!prevProps.removeTasksSuccess && this.props.removeTasksSuccess) {
      this.setState({
        showConfirm: false,
        checkedTasks: new Set(),
      });
    }

    if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
      this.setState({ editTask: null });
    }
  }

  handleCheck = (taskId) => () => {
    const checkedTasks = new Set(this.state.checkedTasks);
    if (checkedTasks.has(taskId)) {
      checkedTasks.delete(taskId);
    } else {
      checkedTasks.add(taskId);
    }
    this.setState({ checkedTasks });
  };

  handleEdit = (task) => () => {
    this.setState({ editTask: task });
  };

  onRemoveSelected = () => {
    const checkedTasks = [...this.state.checkedTasks];
    this.props.removeTasks({
      tasks: checkedTasks,
    });
  };

  toggleConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  };

  toggleNewTaskModal = () => {
    this.setState({
      openNewTaskModal: !this.state.openNewTaskModal,
    });
  };

  render() {
    const { checkedTasks, showConfirm, editTask } = this.state;
    const { tasks } = this.props;

    const tasksComponents = tasks.map((task) => (
      <Col
        key={task._id}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}
        style={{ flex: "0 0 20%", maxWidth: "20%" }}
      >
        <Task
          data={task}
          onCheck={this.handleCheck(task._id)}
          onEdit={this.handleEdit(task)}
          disabled={!!checkedTasks.size}
        />
      </Col>
    ));

    return (
      <Container fluid={true}>
        <Row>
          <Col
            sm={8}
            lg={10}
            xs={12}
            md={{ span: 6, offset: 3 }}
            className="text-center"
            style={{ flex: "0 0 50%", marginTop: "53px", marginBottom: "20px" }}
          >
            <Button
              variant="primary"
              className="m-1 mt-5"
              disabled={checkedTasks.size}
              onClick={this.toggleNewTaskModal}
            >
              Add Task
            </Button>
          </Col>
        </Row>

        <Row style={{ padding: "0 2rem" }}>{tasksComponents}</Row>

        <Row
          className="justify-content-center"
          style={{
            width: "80%",
            left: "0",
            right: "0",
            margin: "20px auto 30px auto",
          }}
        >
          <Button
            variant="danger"
            disabled={!checkedTasks.size}
            onClick={this.toggleConfirm}
          >
            Remove selected
          </Button>
        </Row>

        {showConfirm && (
          <Confirm
            count={checkedTasks.size}
            onSubmit={this.onRemoveSelected}
            onCancel={this.toggleConfirm}
          />
        )}
        {!!editTask && (
          <EditTaskModal
            data={editTask}
            onSave={this.handleSave}
            onCancel={this.handleEdit(null)}
          />
        )}

        {this.state.openNewTaskModal && (
          <NewTask onCancel={this.toggleNewTaskModal} />
        )}

        <Row
          className="text-center"
          style={{
            position: "absolute",
            width: "70%",
            left: "0",
            right: "0",
            margin: "0 auto",
          }}
        >
          <Footer />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.taskReducer.tasks,
    addTaskSuccess: state.taskReducer.addTaskSuccess,
    removeTasksSuccess: state.taskReducer.removeTasksSuccess,
    editTaskSuccess: state.taskReducer.editTaskSuccess,
  };
};

const mapDispatchToProps = {
  getTasks,
  removeTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
