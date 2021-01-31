import React, { PureComponent } from "react";
import {
  Card,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditTaskModal from "../EditTaskModal";
import { getTask, removeTask } from "../../store/actions";
import { connect } from "react-redux";

class SingleTask extends PureComponent {
  state = {
    isEdit: false,
  };

  componentDidMount() {
    const taskId = this.props.match.params.id;
    this.props.getTask(taskId);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.removeTaskSuccess && this.props.removeTaskSuccess) {
      this.props.history.push("/");
    }

    if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
      this.toggleEditModal();
    }
  }

  handleRemove = () => {
    const taskId = this.props.task._id;
    this.props.removeTask(taskId, "single");
  };

  toggleEditModal = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  render() {
    const { isEdit } = this.state;
    const { task } = this.props;

    const taskStyle = {
      display: "flex",
      justifyContent: "center",
      width: "50%",
      boxShadow: "0 0 15px 2px rgba(0, 0, 0, 0.3)",
    };

    return (
      <>
        {task ? (
          <div
            style={{
              margin: "150px 0 50px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card style={taskStyle}>
              <Card.Body>
                <Card.Title className="h3">{task.title}</Card.Title>
                <Card.Text>Description: {task.description}</Card.Text>
                <Card.Text>Date: {task.date}</Card.Text>
                <Card.Text>Created: {task.created_at}</Card.Text>
                <Card.Text>Status: {task.status}</Card.Text>

                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Edit</strong>
                    </Tooltip>
                  }
                >
                  <Button
                    title="Edit"
                    className="m-1"
                    variant="info"
                    onClick={this.toggleEditModal}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Remove</strong>
                    </Tooltip>
                  }
                >
                  <Button
                    title="Remove"
                    className="m-1"
                    variant="danger"
                    onClick={this.handleRemove}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </OverlayTrigger>

                {isEdit && (
                  <EditTaskModal
                    data={task}
                    onCancel={this.toggleEditModal}
                    from="single"
                  />
                )}
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div>There is no task!</div>
        )}

      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    task: state.taskReducer.task,
    removeTaskSuccess: state.taskReducer.removeTaskSuccess,
    editTaskSuccess: state.taskReducer.editTaskSuccess,
  };
};

const mapDispatchToProps = {
  getTask,
  removeTask,
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
