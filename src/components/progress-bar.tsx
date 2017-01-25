import { h, Component, ComponentProps } from 'preact'
import { denormalize } from '../lib/utils'

type RGBA = [number, number, number, number]

export interface IProgressBarProps extends ComponentProps {
  total: number
  current: number
  text?: string
  overlayStartColor?: RGBA
  overlayEndColor?: RGBA
}

export class ProgressBar extends Component<IProgressBarProps, Object> {
  public static defaultProps = {
    overlayStartColor: [22, 204, 95, 0.38],
    overlayEndColor: [128, 0, 0, 0.6],
  }
  
  render(props: IProgressBarProps) {
    const { total, current, overlayStartColor, overlayEndColor } = this.props
    const percentMultiplier = Math.max(Math.min((current / total), 1), 0)
    const percent = percentMultiplier * 100

    const resultColor = [
      [percentMultiplier, overlayStartColor[0], overlayEndColor[0]],
      [percentMultiplier, overlayStartColor[1], overlayEndColor[1]],
      [percentMultiplier, overlayStartColor[2], overlayEndColor[2]],
      [percentMultiplier, overlayStartColor[3], overlayEndColor[3]],
    ]
    .map(tuple => denormalize.apply(null, tuple))
    .map((x, i) => i < 3 ? parseInt(x, 10) : parseFloat(x)) as RGBA

    return (
      <div className="progress-bar progress-bar-centered-text">
        <div
          className="progress-bar-overlay"
          style={{ background: `rgba(${resultColor.join(',')})` }}
        ></div>
        <div className="progress-bar-percent-background">
          <div className="progress-bar-percent-text">{this.props.children}</div>
        </div>
        <div
          className="progress-bar-percent-foreground-mask"
          style={{ width: `${percent}%` }}
        >
          <div className="progress-bar-percent-foreground">
            <div className="progress-bar-percent-text">{this.props.children}</div>
          </div>
        </div>
      </div>
    )
  }
}